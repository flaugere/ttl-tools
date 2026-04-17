/**
 * HTML email template for persona quiz results
 * Responsive design with 600px width for better email client compatibility
 */

export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ton persona de traileur·se</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header img {
      max-width: 100%;
      height: auto;
    }
    .offres {
      text-align: left;
      margin: 20px 0;
    }

    .content {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .persona-description {
      margin-top: 20px;
      padding: 15px;
      background-color: #e9ecef;
      border-radius: 4px;
    }
    @media (max-width: 600px) {
      .container {
        padding: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://trailthelimit.fr/banniere.jpg" alt="Bannière Ultra Trail">
    </div>
    <div class="content"></div>
      <h1>Ton persona de traileur·se</h1>
      <div class="offres">
       Si tu veux aller plus loin, découvre nos offres :
       <br />Ton checkup UltraTrail : https://trailthelimit.fr/#services
       <br />Pour un coaching 100% personnalisé, tu peux nous DM sur Instagram: https://instagram.com/trailthelimit
      </div>
      <p>
        Merci d'avoir participé à notre quiz !<br />
      </p>
      <div class="persona-description">
        {{PERSONA_DESCRIPTION}}
      </div>
    </div>
  </div>
</body>
</html>
`;