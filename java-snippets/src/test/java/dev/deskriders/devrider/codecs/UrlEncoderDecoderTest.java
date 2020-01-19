package dev.deskriders.devrider.codecs;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.EncoderException;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UrlEncoderDecoderTest {
    String plain = "http://www.example.com/?a=$123";
    String encoded = "http%3A%2F%2Fwww.example.com%2F%3Fa%3D%24123";

    @Test
    public void testUrlEncoding() throws EncoderException {
        // when
        assertEquals(encoded, UrlEncoderDecoder.encode(plain));
    }

    @Test
    public void testUrlDecoding() throws DecoderException {
        // when
        assertEquals(plain, UrlEncoderDecoder.decode(encoded));
    }
}