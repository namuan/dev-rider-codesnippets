package dev.deskriders.devrider.markdown;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MarkdownViewerTest {

    @Test
    public void testConvertStringToMarkdownHtml() {
        // given
        String plainText = "### Heading";

        // when
        String markdownHtml = MarkdownViewer.convertToHtml(plainText);

        // then
        assertEquals("<h3>Heading</h3>", markdownHtml.trim());
    }

}