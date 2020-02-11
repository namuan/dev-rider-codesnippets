package main

import "encoding/base64"

func Encode(src string) string {
    encoded := base64.StdEncoding.EncodeToString([]byte(src))
    return encoded
}
