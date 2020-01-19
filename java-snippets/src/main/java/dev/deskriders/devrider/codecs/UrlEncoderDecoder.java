package dev.deskriders.devrider.codecs;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.EncoderException;
import org.apache.commons.codec.net.URLCodec;

public class UrlEncoderDecoder {
    public static String encode(String source) throws EncoderException {
        return new URLCodec().encode(source);
    }

    public static String decode(String source) throws DecoderException {
        return new URLCodec().decode(source);
    }
}
