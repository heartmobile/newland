import React from "react";

export const metadata = {
  title: 'Terms & Conditions | Heart Mobile',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 18, fontFamily: "sans-serif" }}>
      <a href="/" style={{ color: "#c62828", textDecoration: "none" }}>← Home</a>
      
      <h1>Terms &amp; Conditions</h1>
      
      <section style={{ background: "#fbfbfb", padding: 14, borderRadius: 8, marginBottom: 20 }}>
        <strong style={{ display: "block", marginBottom: 8 }}>Quick summary</strong>
        <ul>
          <li>This Agreement governs your use of Heart Mobile's website.</li>
          <li>By using the site you accept these terms; if you disagree you should not use the site.</li>
          <li>Use is intended for Canadian residents and is governed by Ontario law.</li>
        </ul>
      </section>

      <div style={{ whiteSpace: "pre-wrap", marginTop: 12, lineHeight: "1.6", color: "#333" }}>
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

 Links to the Website without the express written permission of Heart Mobile  are strictly prohibited. Heart Mobile may in its discretion cancel and revoke any permission it may give to link to the Website at any time and without any notice or liability. The framing, mirroring, scraping or data-mining of the Website or any of its content in any form and by any means is strictly prohibited. You may not use any collaborative browsing or display technologies in connection with your use of the Website or to post comments, communications, or any other data of any kind to or on the Website with the intention that such postings may be viewed by others.`}
      </div>

      <footer style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #eee" }}>
        <nav aria-label="legal">
          <a href="/terms" style={{ color: "#0066cc", textDecoration: "none" }}>Terms &amp; Conditions</a> |{' '}
          <a href="/privacy" style={{ color: "#0066cc", textDecoration: "none" }}>Privacy Policy</a>
        </nav>
        <p style={{ fontSize: "0.9rem", color: "#666", marginTop: 8 }}>&copy; {new Date().getFullYear()} Heart Mobile</p>
      </footer>
    </div>
  );
}
