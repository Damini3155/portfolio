package com.librery;

import com.librery.config.AppConfig;
import com.librery.service.Library;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        Library library = context.getBean(Library.class);

        int result = library.borrowBook("fiction", 3);

        if (result == -1) {
            System.out.println("Error: Not enough books");
        } else if (result == -2) {
            System.out.println("Error: Category not found");
        } else {
            System.out.println("Remaining books: " + result);
        }

        context.close();
    }
}