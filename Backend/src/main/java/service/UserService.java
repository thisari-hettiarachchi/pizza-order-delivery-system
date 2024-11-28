package service;
import model.User;

public abstract class UserService {
    public abstract boolean registerUser(User user);
    public abstract User validateUser(String username, String password);
}
