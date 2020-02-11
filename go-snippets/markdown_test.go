package main

import "testing"

func TestMarkdownToHtml(t *testing.T) {
	rawMarkdown := "### Heading"
	expected := "<h3>Heading</h3>"
	if gotHtmlString := MarkdownToHtml(rawMarkdown); gotHtmlString != expected {
		t.Errorf("MarkdownToHtml() = %v, want %v", gotHtmlString, expected)
	}
}