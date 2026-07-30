package com.herguardian.Backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;

    public JwtService(
            @Value("${jwt.secret}")
            String secret) {

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes()
        );
    }
    // Generate JWT
    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract email from token
    public String extractEmail(String token) {

        return getClaims(token).getSubject();

    }

    // Validate token
    public boolean isTokenValid(String token, String email) {

        return extractEmail(token).equals(email)
                && !isTokenExpired(token);

    }

    private boolean isTokenExpired(String token) {

        return getClaims(token)
                .getExpiration()
                .before(new Date());

    }

    private Claims getClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

    }
}