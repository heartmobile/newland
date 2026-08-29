import deviceIndex from '@/data/device-index.json';

interface DeviceIndexRow {
  make: string;
  model: string;
  storage: string;
  color: string;
  condition: string;
  carrier: string;
}

export interface DeviceColorOption {
  color: string;
  carriers: string[];
}

export interface DeviceConditionGroup {
  condition: string;
  options: DeviceColorOption[];
}

export interface DeviceStorageGroup {
  storage: string;
  conditions: DeviceConditionGroup[];
}

export interface DeviceModelGroup {
  id: string;
  make: string;
  model: string;
  storageOptions: DeviceStorageGroup[];
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/galazy/g, 'galaxy')
    .replace(/\bplus\b/g, ' plus ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function storageValue(storage: string): number {
  const match = storage.match(/([\d.]+)\s*(tb|gb)/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  const value = Number(match[1]);
  return match[2].toLowerCase() === 'tb' ? value * 1024 : value;
}

function conditionValue(condition: string): number {
  const grade = condition.match(/grade\s*([a-d])/i)?.[1]?.toUpperCase();
  return grade ? grade.charCodeAt(0) - 65 : 99;
}

function modelValue(model: string): number {
  if (/\bfe\b/i.test(model)) return 1;
  if (/\bplus\b|\+/i.test(model)) return 2;
  if (/\bultra\b/i.test(model)) return 3;
  if (/\bedge\b/i.test(model)) return 4;
  return 0;
}

export function searchDeviceIndex(query: string): DeviceModelGroup[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  const tokens = normalizedQuery.split(' ');
  const matchingRows = (deviceIndex as DeviceIndexRow[]).filter((row) => {
    const searchable = normalize(`${row.make} ${row.model}`);
    return tokens.every((token) => searchable.includes(token));
  });

  const models = new Map<string, DeviceIndexRow[]>();
  for (const row of matchingRows) {
    const key = `${row.make}\u0000${row.model}`;
    const rows = models.get(key) || [];
    rows.push(row);
    models.set(key, rows);
  }

  return Array.from(models.entries()).map(([key, rows]) => {
    const [make, model] = key.split('\u0000');
    const storageMap = new Map<string, DeviceIndexRow[]>();
    for (const row of rows) {
      const storageRows = storageMap.get(row.storage) || [];
      storageRows.push(row);
      storageMap.set(row.storage, storageRows);
    }

    const storageOptions = Array.from(storageMap.entries()).map(([storage, storageRows]) => {
      const conditionMap = new Map<string, DeviceIndexRow[]>();
      for (const row of storageRows) {
        const conditionRows = conditionMap.get(row.condition) || [];
        conditionRows.push(row);
        conditionMap.set(row.condition, conditionRows);
      }

      const conditions = Array.from(conditionMap.entries()).map(([condition, conditionRows]) => {
        const colorMap = new Map<string, Set<string>>();
        for (const row of conditionRows) {
          const carriers = colorMap.get(row.color) || new Set<string>();
          if (row.carrier) carriers.add(row.carrier);
          colorMap.set(row.color, carriers);
        }
        const options = Array.from(colorMap.entries())
          .map(([color, carriers]) => ({ color, carriers: Array.from(carriers).sort() }))
          .sort((left, right) => left.color.localeCompare(right.color));
        return { condition, options };
      }).sort((left, right) => conditionValue(left.condition) - conditionValue(right.condition));

      return { storage, conditions };
    }).sort((left, right) => storageValue(left.storage) - storageValue(right.storage));

    return { id: `${normalize(make)}-${normalize(model).replaceAll(' ', '-')}`, make, model, storageOptions };
  }).sort((left, right) => modelValue(left.model) - modelValue(right.model) || left.model.localeCompare(right.model));
}
