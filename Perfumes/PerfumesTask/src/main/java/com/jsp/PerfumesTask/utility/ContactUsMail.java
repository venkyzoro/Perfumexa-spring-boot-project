
package com.jsp.PerfumesTask.utility;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Component;



@Component
public class ContactUsMail {
    @Autowired
    JavaMailSender mailSender;

    public void sendEmail(String email, String text, String subject) {
        System.out.println("Email Sent");
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("dineshraja9848@gmail.com");
        mailMessage.setTo(email);
        mailMessage.setSubject(subject);
        mailMessage.setText(text);
        try {
            mailSender.send(mailMessage);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

}
