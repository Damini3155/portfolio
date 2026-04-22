package com.librery.config;

import com.librery.model.Book;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import java.util.List;

@Configuration
@ComponentScan(basePackages = "com.librery")
@PropertySource("classpath:books.properties")
public class AppConfig {

    @Bean
    public List<Book> bookList() {
        return List.of(
                new Book("Book1", "Author1", "fiction"),
                new Book("Book2", "Author2", "science"),
                new Book("Book3", "Author3", "history")
        );
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer configurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}