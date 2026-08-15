<!-- Place in your footer partial/template to link the Terms page -->
<footer>
  <nav aria-label="legal">
    <a href="/terms.html">Terms &amp; Conditions</a> | <a href="/privacy.html">Privacy Policy</a>
  </nav>
  <p style="font-size:0.9rem;color:#666">&copy; Heart Mobile</p>
</footer>

2) Footer snippet — paste this into your site footer template (HTML partial)

<!-- Place in your footer partial/template to link the Terms page -->
<footer>
  <nav aria-label="legal">
    <a href="/terms.html">Terms &amp; Conditions</a> | <a href="/privacy.html">Privacy Policy</a>
  </nav>
  <p style="font-size:0.9rem;color:#666">&copy; Heart Mobile</p>
</footer>
3) Minimal React component (if your nested site uses React) — put in src/components/Terms.jsx (or .tsx)

import React from "react";

export default function Terms() {
  return (
    <div style={{maxWidth:980, margin:"0 auto", padding:18}}>
      <a href="/" style={{color:"#c62828", textDecoration:"none"}}>← Home</a>
      <h1>Terms &amp; Conditions</h1>
      <section style={{background:"#fbfbfb", padding:14, borderRadius:8}}>
        <strong>Quick summary</strong>
        <ul>
          <li>This Agreement governs your use of Heart Mobile's website.</li>
          <li>By using the site you accept these terms; if you disagree you should not use the site.</li>
          <li>Use is intended for Canadian residents and is governed by Ontario law.</li>
        </ul>
      </section>

      <div style={{whiteSpace:"pre-wrap", marginTop:12}}>
{`PLEASE READ THIS AGREEMENT CAREFULLY AS IT GOVERNS YOUR USE OF HEART MOBILES WEBSITE. IT EXEMPTS HEART MOBILES AND OTHER PERSONS FROM LIABILITY OR LIMITS THEIR LIABILITY, AND CONTAINS OTHER IMPORTANT PROVISIONS THAT YOU SHOULD READ.
Your Acceptance of This Agree
This is an Agreement between you and all persons you represent (and for purposes of this Agreement, "person" includes natural persons and any type of incorporated or unincorporated entity) and Heart Mobile. (“ 101123964 Ontario LTD.") regarding your access to and use of Heart Mobile's website and all content, information, products and services available on or through the website (collectively, the "Website"). This Agreement also provides benefits to Heart Mobiles 's service providers, suppliers and other persons.
Each time you use the Website you signify your acceptance and agreement, and the acceptance and agreement of any person you purport to represent, to be bound by this Agreement as it then reads, and you represent and warrant that you have the legal authority to agree to and accept this Agreement on behalf of yourself and any person you purport to represent. If you do not agree with each provision of this Agreement, or you are not authorized to agree to and accept this Agreement on behalf of the person you purport to represent, you may not access or use the Website. The Website is for convenience and informational purposes only and is not intended to convey advice or recommendations, or an offer to sell any product or service.This Agreement is in addition to any other agreement you may have with Heart Mobile, including a transaction agreement.

Permission to Use the Website
You may use the Website only if you are a resident of Canada, have reached the age of majority where you live, and you can form legally binding contracts under applicable law. You may not use the Website if you live in a jurisdiction where access to or use of the Website or any part of it may be illegal or prohibited. It is solely your responsibility to determine whether your use of the Website is lawful, and you must comply with all applicable laws. Heart Mobile reserves the right to request proof of identification and age. Heart Mobile ships internationally and domestically.

 

Changes to This Agreement

Heart Mobile may, in its sole discretion, change this Agreement from time to time as it relates to future use of the Website, by posting a revised Agreement on the Website. By using the Website after this revised Agreement has been posted, you signify your acceptance and agreement to be bound by the revised Agreement. You may not change this Agreement in any manner.

Ownership and Permitted Use of the Website
The presentation, arrangement, coordination, enhancement and selection of such and other information in text, graphical, video and audio forms, images, icons, software, designs, applications, data, and other elements available on or through the Website) is the property of Heart Mobile and others, and is protected by Canadian and international copyright, trademark and other laws. Your use of the Website does not transfer to you any ownership or other rights in the Website or its content. The Website is made available to you for your lawful, personal use only. You may use the Website only in the manner described expressly in this Agreement and subject to all applicable laws. Using the Website for any other purpose or in any other manner is strictly prohibited.

You may print Website pages provided that you do not modify any of the pages and you do not remove or alter any visible or non-visible identification, marks, notices, or disclaimers. The Website and its content may not be copied, imitated, reproduced, republished, uploaded, posted, transmitted, modified, indexed, catalogued, mirrored or distributed in any way, in whole or in part, without the express prior written consent of Heart Mobile . You may not sell or resell any part of the Website or access to the Website. You may not use any of the software that is used in the operation or provision of the Website except while you are using the Website in accordance with this Agreement.

Misprints and Errors, Product Availability and Prices
Heart Mobile endeavours to provide current and accurate information on the Website. However, misprints, errors, inaccuracies, omissions (including incorrect specifications for products) or other errors may sometimes occur. Heart Mobile cannot guarantee that products and services advertised on the Website will be available when ordered or thereafter. Heart Mobile does not warrant that the content of the Website including, without limitation, product descriptions or photographs, is accurate or complete.

 Heart Mobile  reserves the right to: (a) correct any error, inaccuracy or omission at any time without prior notice or liability to you or any other person; (b) change at any time the products and services advertised or made available for sale on the Website, the prices, fees, charges and specifications of such products and services, any promotional offers and any other Website content without any notice or liability to you or any other person; (c) reject, correct, cancel or terminate any order, including accepted orders for any reason; and (d) limit quantities available for sale or sold.

The advertisements on the Website are invitations to you to make offers to purchase products and services on the Website and are not offers to sell. All prices and other amounts appearing on the Website are quoted in Canadian dollars.

 Trademark Information
Heart Mobile ™, the  logo and other names and logos appearing on or in connection with the Website (the "Marks") are registered or unregistered trademarks, service marks, tradenames and logos owned or licensed by Heart Mobile or their respective owners or licensees.Any use of the Marks, except as expressly provided in this Agreement, is strictly prohibited. Nothing appearing on the Website or elsewhere shall be construed as granting, by implication, estoppel, or  otherwise, any licence or right to use any of the Marks.

 Links to the Website without the express written permission of Heart Mobile  are strictly prohibited. Heart Mobile may in its discretion cancel and revoke any permission it may give to link to the Website at any time and without any notice or liability. The framing, mirroring, scraping or data-mining of the Website or any of its content in any form and by any means is strictly prohibited. You may not use any collaborative browsing or display technologies in connection with your use of the Website or to post comments, communications, or any other data of any kind to or on the Website with the intention that such postings may be viewed by other users of the Website.

 Unsolicited Submissions

In order to avoid potential misunderstandings or disputes, Heart Mobile does not accept or consider unsolicited ideas or suggestions ("Submissions"). If you send Submissions to Heart Mobile or the Website, you automatically grant (or warrant that the owner of the Submissions grants) to Heart Mobile and its successors, assigns and licensees a perpetual, royalty-free, irrevocable, unrestricted, non-exclusive, world-wide, assignable, sub-licensable right and license to use and exploit the Submissions or any ideas, concepts, know-how or techniques associated with the Submissions for any purpose whatsoever, commercial or otherwise, using any form, media or technology now known or later developed, without providing any attribution or compensation to you or any other person, without any liability whatsoever, and free from any obligation of confidence or other duties on the part of Heart Mobile or its successors, assigns and licensees, and you agree, represent and warrant that all moral rights in the Submissions are waived in favour of Hear Mobile and its successors, assigns and licensees.

Your Information
All information you provide through the Website, including registration information (name and email address), payment information (credit card numbers and expiration dates), and transaction-related information, must be true, accurate, current and complete. Heart Mobile will rely on the information you provide. You will be solely responsible and liable for any and all loss, damage, and additional costs that you, Heart Mobile or any other person may incur as a result of your submission of any false, incorrect or incomplete information or your failure to update your registration information and payment information within 30 days of any change.

 Disclaimers, Liability Exclusions/Limitations and Indemnity
Disclaimers
YOUR ACCESS TO AND USE OF THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY REPRESENTATIONS, WARRANTIES OR CONDITIONS OF ANY KIND, WHETHER EXPRESS OR IMPLIED, AND INCLUDING WITHOUT LIMITATION IMPLIED REPRESENTATIONS, WARRANTIES OR CONDITIONS OF OR RELATING TO ACCURACY, ACCESSIBILITY, FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, PERFORMANCE OR DURABILITY, ALL OF WHICH ARE DISCLAIMED BY HEART MOBILE TO THE FULLEST EXTENT PERMITTED BY LAW.

THE FOLLOWING CLAUSE IS INAPPLICABLE IN QUEBEC:
Exclusions
HEART MOBILE AND ITS PROVIDERS WILL NEVER BE LIABLE TO YOU OR ANY OTHER PERSON FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE OR EXEMPLARY LOSS OR DAMAGE ARISING FROM, CONNECTED WITH, OR RELATING TO THE WEBSITE OR THIS AGREEMENT INCLUDING BUT NOT LIMITED TO LOSS OF DATA, BUSINESS, MARKETS, SAVINGS, INCOME, PROFITS, USE, PRODUCTION, REPUTATION OR GOODWILL, ANTICIPATED OR OTHERWISE, OR ECONOMIC LOSS, UNDER ANY THEORY OF LIABILITY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY OR ANY OTHER THEORY OR LAW OR EQUITY), REGARDLESS OF ANY NEGLIGENCE OR OTHER FAULT OR WRONGDOING (INCLUDING WITHOUT LIMITATION GROSS NEGLIGENCE AND FUNDAMENTAL BREACH) BY HEART MOBILE OR ANY PERSON FOR WHOM SWIFTRONICS IS RESPONSIBLE, AND EVEN IF HEART MOBILE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH LOSS OR DAMAGE BEING INCURRED.

Acknowledgement and Exclusion by Statute in Certain Jurisdictions
THE EXCLUSION OF CERTAIN WARRANTIES AND THE LIMITATION OF CERTAIN LIABILITIES IS PROHIBITED IN SOME JURISDICTIONS. THESE STATUTORY PROHIBITIONS MAY APPLY TO YOU.

Personal Information Privacy
HEART MOBILE collects, uses and discloses personal information in accordance with its Privacy Policy, which may be changed from time to time by HEART MOBILE in its discretion without any notice or liability to you or any other person by making an amended Privacy Policy accessible through the Website. By accepting this Agreement, and each time you use the Website, you consent to the collection, use and disclosure of your personal information by HEART MOBILE in accordance with the Privacy Policy as it then reads.

 Other Businesses/Sites/Resources
Parties other than HEART MOBILE  ("Other Businesses") may operate stores, provide services, or sell products through the Website. In addition, for your convenience, the Website may include links or references to other Internet sites or resources and businesses operated by other persons (collectively "Other Sites"). Other Businesses and Other Sites are independent from HEART MOBILE , and HEART MOBILE has no responsibility or liability for or control over Other Businesses and Other Sites, their business, goods, services, or content. HEART MOBILE  does not sponsor, endorse or warrant the offerings of Other Businesses or Other Sites or their business, goods, services, or content, unless expressly indicated in writing. Your use of Other Businesses or Other Sites and your dealings with the owners or operators of Other Businesses or Other Sites is at your own risk, and you will not make any claim against HEART MOBILE  arising from, connected with, or relating to your use of Other Businesses or Other Sites or your dealings with the owners or operators of Other Businesses or Other Sites. You should review the privacy policies and other conditions of use of Other Businesses and Other Sites. As between you and HEART MOBILE , this Agreement, with all necessary modifications, applies to your access and use of any Other Businesses or Other Sites and their business, goods, services and content.

 Termination
Notwithstanding any other provision of this Agreement, Heart Mobile may in its discretion change, discontinue, modify, restrict, suspend or terminate the Website or any part of it without any notice or liability to you or any other person. Heart Mobile may in its discretion and for its convenience at any time immediately terminate, temporarily or permanently, this Agreement or your permission to access and use the Website without any notice or liability to you or any other person. If this Agreement or your permission to access or use all or any part of the Website is terminated for any reason, then this Agreement and all other then existing agreements between you and Heart Mobile  will continue to apply and be binding upon you regarding your prior access to and use of the Website, and anything connected with, relating to or arising therefrom.

 Governing Law and Dispute Resolution
This Agreement, your access to and use of the Website, and all related matters are governed solely by the laws of the Province of Ontario, Canada and applicable federal laws of Canada (and in the case of use of the Website in Quebec by residents of Quebec, by the laws of Quebec and the applicable federal laws of Canada). Any dispute between you and Heart Mobile or any other person arising from, connected with or relating to the Website, this Agreement, or any related matters (collectively "Disputes") will be resolved before the courts of the Province of Ontario, sitting in the City of Brampton (and in the case of use of the Website in Quebec by residents of Quebec, before the courts of Quebec, sitting in the City of Montreal), and you hereby irrevocably submit and attorn to the original and exclusive jurisdiction of those courts in respect of all Disputes.

Other Matters
If any provision of this Agreement is held to be invalid or unenforceable for any reason, then the provision will be deemed to be severed from this Agreement and the remaining provisions will continue in full force and effect. This Agreement enures to the benefit of and is binding upon each of Heart Mobile and its successors, assigns and related persons, and you and your heirs, executors, administrators, successors, permitted assigns and personal representatives. You may not assign this Agreement or the rights and obligations under this Agreement. Heart Mobile may assign this Agreement and its rights and obligations under this Agreement without your consent. No consent or waiver by any party to or of any breach or default by any other party in its performance of its obligations under this Agreement will be: (a) deemed or construed to be a consent to or waiver of a continuing breach or default or any other breach or default of those or any other obligations of that party; or (b) effective unless in writing and signed by all parties. The parties have expressly requested and required that this Agreement and all other related documents be drawn up in the English language. Les parties conviennent et exigent expressément que ce Contrat et tous les documents qui s'y rapportent soient rédigés en anglais.
Any rights not expressly granted by this Agreement are reserved to Heart Mobile.


Your Acceptance of This Agree

This is an Agreement...`}
        </div>
    </div>
  );
}
