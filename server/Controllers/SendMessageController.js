const CatchAsyncError = require("../Middleware/CatchAsyncError");
const SendEmail = require("../Utils/SendEmail");

const SendMessage = CatchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  // Validate input fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  // Construct the email content
  const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="text-align: center; color: #4CAF50;">New Message from ${name}</h2>
      <p><strong>Sender's Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <footer style="text-align: center; font-size: 12px; color: #777;">
        <p>&copy; ${new Date().getFullYear()} ArtWithCremlon. All rights reserved.</p>
      </footer>
    </div>
  `;

  try {
    // Send email using the utility function
    await SendEmail({
      email: "monodemo2024@gmail.com",
      subject: "New Contact Message",
      message: emailContent,
      isHtml: true,
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to send email. Please try again later.",
      success: false,
    })
  }
});

module.exports = SendMessage;
