import sql from "../Database.js";

import bcrypt from "bcrypt"

export const addUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;



const checkUsername =  await sql`
SELECT * FROM users WHERE  username=${username}

`
if(checkUsername.length>0){

  res.status(202).json("username alredy exist")
}




else{


  const salt = await bcrypt.genSalt(10); // 10 is the saltRounds

  const pass = await bcrypt.hash(password,salt)


    const result = await sql`
      INSERT INTO users (name, email, username, password)
      VALUES (${name}, ${email}, ${username}, ${pass})
    `;

    res.status(200).json({ message: 'User added successfully', data: result });
}
  } catch (error) {
    console.error(error);
    return res.status(202).json({ success: false, message: 'Username already exists' });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await sql`
      SELECT * FROM users
    `;

    res.status(200).json({ message: 'Users fetched successfully', data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addIntrest = async (req, res) => {
  try {
    const { userid } = req.params;
    const { selectedOptions } = req.body;

    const result = await sql`
      UPDATE users SET interest=${selectedOptions} WHERE username=${userid}
    `;
    sendEmail(userid)

    res.status(200).json({ message: 'Interests added successfully', data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




export const addImage = async (req, res) => {
  try {
    const { userid } = req.params;
    const { image,location } = req.body;

    const result = await sql`
      UPDATE users SET image=${image},location=${location} WHERE username=${userid}
    `;
    res.status(200).json({ message: 'Interests added successfully', data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getAvataar = async (req, res) => {
  try {
    const { userid } = req.params;
   
    const result = await sql`
SELECT * FROM users WHERE username=${userid}
    `;
    res.status(200).json({ message: 'Interests added successfully', data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




import { Resend } from 'resend';

const sendEmail = async (username) => {
  try {

    const [result] = await sql`
    SELECT * FROM users WHERE username=${username}
  `;

 


    const resend = new Resend('re_bSMczyip_DEfZFtiWjvRqj8zTFZGrYZxL');

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: result.email,
      subject: 'Making your Day GOOD',
      html: '<p> Hiii '+result.username +'You have received this from stranzer for testing mail <strong>first email</strong>!</p>'
    });

   
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Usage

