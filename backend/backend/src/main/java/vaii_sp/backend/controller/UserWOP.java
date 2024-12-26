package vaii_sp.backend.controller;

import lombok.Getter;
import lombok.Setter;
import vaii_sp.backend.model.User;

@Getter
@Setter
public class UserWOP {
    private String username;

    public UserWOP(User user) {
        this.username = user.getUsername();
    }
}
