package com.rmc.pejo.endpoints.request;

public record RegistrationRequest(String firstName, String lastName, String password, String email) {
}
