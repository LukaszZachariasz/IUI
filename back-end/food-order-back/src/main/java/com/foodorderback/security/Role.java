package com.foodorderback.security;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Role implements Serializable {


    private static final long serialVersionUID = 84378273L;

    @Id
    private int roleId;

    private String name;

    private Set<UserRole> userRoles;

    public Role() {
        this.userRoles = new HashSet<>();
    }
}
