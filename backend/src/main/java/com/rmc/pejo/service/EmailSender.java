package com.rmc.pejo.service;

public interface EmailSender {
    void send(String to, String email, String subject);
}
