package vaii_sp.backend.controller;

import lombok.Getter;
import lombok.Setter;
import vaii_sp.backend.model.User;

@Getter
@Setter
public class UserWOP {
    private String username;
    private String name;
    private String surname;
    private String userRole;

    public UserWOP(User user) {
        this.username = user.getUsername();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.userRole = user.getUserRole();
    }
}
