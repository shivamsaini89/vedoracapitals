import { fileURLToPath } from 'node:url';

const logoPath = fileURLToPath(new URL('../../public/vedora_icon.png', import.meta.url));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function createEnquiryEmail(enquiry) {
  const details = [
    ['Full name', enquiry.fullName],
    ['Mobile number', enquiry.mobileNumber],
    ['Email address', enquiry.email || 'Not provided'],
    ['City', enquiry.city],
    ['Loan type', enquiry.loanType],
    ['Approximate loan requirement', enquiry.approxLoan || 'Not provided'],
    ['Net monthly salary', enquiry.netSalary ? `INR ${Number(enquiry.netSalary).toLocaleString('en-IN')}` : 'Not provided'],
    ['Employment type', enquiry.employmentType || 'Not provided'],
    ['Preferred contact method', enquiry.contactMethod],
  ];
  const text = [
    'VEDORA CAPITAL SERVICES',
    'New website loan enquiry',
    '',
    ...details.map(([label, value]) => `${label}: ${value}`),
    '',
    'Requirement description:',
    enquiry.description || 'Not provided',
    '',
    `Submission reference: ${enquiry.submissionId}`,
  ].join('\n');
  const rows = details.map(([label, value], index) => `
    <tr style="background:${index % 2 === 0 ? '#ffffff' : '#fffaf6'}">
      <td style="padding:12px 14px;border-bottom:1px solid #f0e7df;color:#667789;font-size:12px;width:38%;vertical-align:top">${escapeHtml(label)}</td>
      <td style="padding:12px 14px;border-bottom:1px solid #f0e7df;color:#17344d;font-size:14px;font-weight:600;vertical-align:top;word-break:break-word">${escapeHtml(value)}</td>
    </tr>`).join('');
  const replyButton = enquiry.email
    ? `<a href="mailto:${escapeHtml(enquiry.email)}?subject=${encodeURIComponent('Re: Your Vedora loan enquiry')}" style="display:inline-block;background:#ef7622;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 18px;border-radius:6px">Reply to enquiry</a>`
    : '';
  const description = escapeHtml(enquiry.description || 'Not provided').replace(/\r?\n/g, '<br>');
  const html = `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:24px 12px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#17344d">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">New loan enquiry from ${escapeHtml(enquiry.fullName)} in ${escapeHtml(enquiry.city)}.</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e8edf1;border-radius:10px;overflow:hidden">
      <tr><td style="height:5px;background:#ef7622;font-size:0;line-height:0">&nbsp;</td></tr>
      <tr><td style="padding:24px 28px;background:#102e49;color:#ffffff">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="padding-right:13px;vertical-align:middle"><img src="cid:vedora-mark@vedora" width="42" height="42" alt="Vedora" style="display:block;width:42px;height:42px;border:0"></td>
          <td style="vertical-align:middle">
            <p style="margin:0 0 5px;color:#ffb16f;font-size:11px;font-weight:700">VEDORA CAPITAL SERVICES</p>
            <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff">New loan enquiry</h1>
          </td>
        </tr></table>
        <p style="margin:8px 0 0;color:#d7e1e9;font-size:14px">A visitor has submitted the website enquiry form.</p>
      </td></tr>
      <tr><td style="padding:24px 28px 8px">
        <h2 style="margin:0 0 14px;font-size:15px;color:#102e49">Applicant details</h2>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #f0e7df;border-radius:6px;border-collapse:separate;overflow:hidden">${rows}
        </table>
      </td></tr>
      <tr><td style="padding:16px 28px 8px">
        <h2 style="margin:0 0 10px;font-size:15px;color:#102e49">Requirement description</h2>
        <div style="padding:14px 16px;background:#fff8f2;border-left:3px solid #ef7622;border-radius:3px;color:#344b5e;font-size:14px;line-height:1.6">${description}</div>
      </td></tr>
      ${replyButton ? `<tr><td style="padding:20px 28px 24px">${replyButton}</td></tr>` : '<tr><td style="height:16px;font-size:0">&nbsp;</td></tr>'}
      <tr><td style="padding:15px 28px;background:#f7f9fa;border-top:1px solid #e8edf1;color:#748392;font-size:11px;line-height:1.6">
        Submission reference: <span style="font-family:monospace;color:#526476">${escapeHtml(enquiry.submissionId)}</span><br>
        This notification was generated automatically by the Vedora website.
      </td></tr>
    </table>
  </body>
</html>`;

  return {
    text,
    html,
    attachments: [{
      filename: 'vedora-mark.png',
      path: logoPath,
      cid: 'vedora-mark@vedora',
      contentDisposition: 'inline',
    }],
  };
}