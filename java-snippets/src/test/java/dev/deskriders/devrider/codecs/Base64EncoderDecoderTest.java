package dev.deskriders.devrider.codecs;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class Base64EncoderDecoderTest {

    String plain = "Hello World";
    String encoded = "SGVsbG8gV29ybGQ=";

    @Test
    public void testBase64Encoding() {
        // when
        assertEquals(encoded, Base64EncoderDecoder.encode(plain));
    }

    @Test
    public void testBase64Decoding() {
        // when
        assertEquals(plain, Base64EncoderDecoder.decode(encoded));
    }
}