package com.librery.service;

import com.librery.model.Book;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class Library {

    private List<Book> books;

    @Value("#{${books.counts}}")
    private Map<String, Integer> categoryCount;

    public Library(List<Book> books) {
        this.books = books;
    }

    public int borrowBook(String category, int count) {

        if (!categoryCount.containsKey(category)) {
            return -2;
        }

        int available = categoryCount.get(category);

        if (count > available) {
            return -1;
        }

        categoryCount.put(category, available - count);
        return categoryCount.get(category);
    }
}