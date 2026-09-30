export type OrderCustomer = {
  name: string
  email: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  notes: string
}

export type OrderItem = {
  name: string
  variantLabel: string
  quantity: number
  price: number
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ponytail: table-based layout with inline styles only — email clients
// (Outlook especially) don't reliably support flexbox/grid/external CSS.
export function buildOrderEmailHtml({
  items,
  subtotal,
  customer,
}: {
  items: OrderItem[]
  subtotal: number
  customer: OrderCustomer
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:4px 0;color:#64748b;width:140px;">${label}</td><td style="padding:4px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`
      : ''

  const itemRows = items
    .map(
      (i) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(i.name)} <span style="color:#64748b;">(${escapeHtml(i.variantLabel)})</span></td>
          <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;text-align:center;color:#0f172a;">${i.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;text-align:right;color:#0f172a;">$${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#0f172a;padding:20px 28px;">
                <span style="color:#ffffff;font-size:18px;font-weight:bold;">Jaycey Peptides</span>
                <span style="color:#94a3b8;font-size:13px;"> — New Order</span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px;">
                <h2 style="margin:0 0 8px;font-size:15px;color:#0f172a;">Customer Details</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:20px;">
                  ${row('Name', customer.name)}
                  ${row('Email', customer.email)}
                </table>

                <h2 style="margin:0 0 8px;font-size:15px;color:#0f172a;">Shipping Address</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:20px;">
                  ${row('Street', customer.street)}
                  ${row('City', customer.city)}
                  ${row('State', customer.state)}
                  ${row('ZIP', customer.zip)}
                  ${row('Country', customer.country)}
                </table>

                <h2 style="margin:0 0 8px;font-size:15px;color:#0f172a;">Order</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:8px;">
                  <tr>
                    <td style="padding-bottom:6px;color:#64748b;font-size:12px;text-transform:uppercase;">Item</td>
                    <td style="padding-bottom:6px;color:#64748b;font-size:12px;text-transform:uppercase;text-align:center;">Qty</td>
                    <td style="padding-bottom:6px;color:#64748b;font-size:12px;text-transform:uppercase;text-align:right;">Total</td>
                  </tr>
                  ${itemRows}
                </table>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:16px;font-weight:bold;margin-bottom:20px;">
                  <tr>
                    <td style="padding-top:10px;color:#0f172a;">Subtotal</td>
                    <td style="padding-top:10px;text-align:right;color:#0f172a;">$${subtotal.toFixed(2)}</td>
                  </tr>
                </table>

                <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:14px 16px;margin-bottom:20px;">
                  <p style="margin:0;font-size:13px;color:#166534;">
                    Payment method: <strong>Bitcoin</strong> — proof of payment screenshot is attached to this email.
                  </p>
                </div>

                ${
                  customer.notes
                    ? `<h2 style="margin:0 0 8px;font-size:15px;color:#0f172a;">Notes</h2><p style="font-size:14px;color:#0f172a;margin:0 0 20px;">${escapeHtml(customer.notes)}</p>`
                    : ''
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
