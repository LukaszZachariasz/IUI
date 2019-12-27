package com.foodorderback.security;


import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class Auth implements GrantedAuthority, Serializable {

    private static final long serialVersionUID = 987654L;

    private final String auth;

    public Auth(String auth) {
        this.auth = auth;
    }

    @Override
    public String getAuthority() {
        return auth;
    }
}
