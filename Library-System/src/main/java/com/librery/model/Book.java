package com.librery.model;

public class Book {
    private String title;
    private String author;
    private String category;

    public Book(String title, String author, String category) {
        this.title = title;
        this.author = author;
        this.category = category;
    }

    public String getCategory() {
        return category;
    }
}