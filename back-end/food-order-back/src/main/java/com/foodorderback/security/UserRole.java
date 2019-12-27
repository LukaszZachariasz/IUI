package com.foodorderback.security;

import com.foodorderback.model.User;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
public class UserRole implements Serializable {

    private static final long serialVersionUID = 38472834L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;


    public UserRole(Role role, User user) {
        this.user = user;
        this.role = role;
    }

}
