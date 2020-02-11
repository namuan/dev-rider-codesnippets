package main

import (
    "encoding/base64"
    "net/url"
)

func Base64Encode(src string) (encoded string) {
    encoded = base64.StdEncoding.EncodeToString([]byte(src))
    return
}

func Base64Decode(src string) (decoded string) {
    decodedBytes, _ := base64.StdEncoding.DecodeString(src)
    decoded = string(decodedBytes)
    return
}

func UrlEncode(src string) (encoded string) {
    encoded = url.QueryEscape(src)
    return
}

func UrlDecode(src string) (decoded string) {
    decoded, _ = url.QueryUnescape(src)
    return
}