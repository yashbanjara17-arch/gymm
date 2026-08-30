import PDFDocument from 'pdfkit';
import Customer from '../models/Customer.js';
import { MEMBERSHIP_PRICES } from '../config/constants.js';

// @desc    Generate and download customer invoice PDF
// @route   GET /api/invoices/:cid
export const generateInvoice = async (req, res, next) => {
  try {
    const customerId = req.params.cid;

    // Security check: only admin or the customer themselves can download the invoice
    if (req.user.role !== 'admin' && req.user.id !== customerId) {
      return res.status(403).json({ success: false, message: 'Unauthorized to download this invoice' });
    }

    const customer = await Customer.findById(customerId).populate('trainer_id', 'name');
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Invoice_${customer.name.replace(/\s+/g, '_')}_${customerId}.pdf`);

    doc.pipe(res);

    // Header Banner styling
    doc.rect(0, 0, doc.page.width, 100).fill('#1E293B');

    doc.fillColor('#FACC15').fontSize(24).font('Helvetica-Bold').text('fitS GYM & FITNESS', 50, 35);
    doc.fillColor('#94A3B8').fontSize(10).font('Helvetica').text('Transform Your Body • Elevate Your Mind', 50, 65);

    // Invoice Title & Date
    doc.fillColor('#1E293B').fontSize(18).font('Helvetica-Bold').text('MEMBERSHIP INVOICE / RECEIPT', 50, 130);
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    doc.fontSize(10).font('Helvetica').fillColor('#64748B').text(`Invoice Date: ${today}`, 50, 155);
    doc.text(`Invoice ID: #INV-${customer._id.toString().slice(-6).toUpperCase()}`, 50, 170);

    // Line separator
    doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(50, 195).lineTo(doc.page.width - 50, 195).stroke();

    // Customer Info Card
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#0F172A').text('CUSTOMER DETAILS', 50, 215);
    doc.fontSize(10).font('Helvetica').fillColor('#334155');
    doc.text(`Full Name:       ${customer.name}`, 50, 235);
    doc.text(`Phone Number:    +91 ${customer.phone}`, 50, 252);
    doc.text(`Assigned Trainer:${customer.trainer_id ? ' ' + customer.trainer_id.name : ' None'}`, 50, 269);
    doc.text(`Diet Plan:       ${customer.diet_plan}`, 50, 286);

    // Table Header
    const tableTop = 325;
    doc.rect(50, tableTop, doc.page.width - 100, 26).fill('#F1F5F9');
    doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(10);
    doc.text('ITEM DESCRIPTION', 65, tableTop + 8);
    doc.text('MEMBERSHIP PLAN', 260, tableTop + 8);
    doc.text('AMOUNT (INR)', doc.page.width - 160, tableTop + 8, { align: 'right' });

    // Table Row
    const rowTop = tableTop + 35;
    const planFee = MEMBERSHIP_PRICES[customer.membership] || 1000;

    doc.font('Helvetica').fillColor('#334155');
    doc.text('Gym Facility Access & Equipment Usage', 65, rowTop);
    doc.text(`${customer.membership} Membership`, 260, rowTop);
    doc.text(`₹${planFee.toLocaleString('en-IN')}`, doc.page.width - 160, rowTop, { align: 'right' });

    doc.strokeColor('#E2E8F0').lineWidth(1).moveTo(50, rowTop + 25).lineTo(doc.page.width - 50, rowTop + 25).stroke();

    // Summary Totals
    const summaryTop = rowTop + 45;
    doc.font('Helvetica-Bold').fontSize(11).fillColor('#0F172A');
    doc.text('Total Membership Fee:', 300, summaryTop);
    doc.text(`₹${planFee.toLocaleString('en-IN')}`, doc.page.width - 160, summaryTop, { align: 'right' });

    doc.font('Helvetica').fontSize(11).fillColor('#16A34A');
    doc.text('Amount Paid:', 300, summaryTop + 22);
    doc.text(`₹${customer.amount_paid.toLocaleString('en-IN')}`, doc.page.width - 160, summaryTop + 22, { align: 'right' });

    doc.font('Helvetica-Bold').fontSize(12);
    if (customer.amount_due > 0) {
      doc.fillColor('#DC2626');
      doc.text('Pending Balance Due:', 300, summaryTop + 46);
      doc.text(`₹${customer.amount_due.toLocaleString('en-IN')}`, doc.page.width - 160, summaryTop + 46, { align: 'right' });
    } else {
      doc.fillColor('#16A34A');
      doc.text('Payment Status:', 300, summaryTop + 46);
      doc.text('FULLY PAID (CLEARED)', doc.page.width - 160, summaryTop + 46, { align: 'right' });
    }

    // Footer & Stamp
    doc.rect(50, doc.page.height - 110, doc.page.width - 100, 60).fill('#F8FAFC');
    doc.fillColor('#64748B').fontSize(9).font('Helvetica')
      .text('Thank you for being a part of fitS GYM family! For inquiries, contact support@fitsgym.com', 65, doc.page.height - 95, {
        align: 'center',
        width: doc.page.width - 130
      });
    doc.text('This is a computer generated invoice and requires no physical signature.', 65, doc.page.height - 75, {
      align: 'center',
      width: doc.page.width - 130
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
