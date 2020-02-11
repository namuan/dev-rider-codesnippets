package main

import "testing"

func TestBase64(t *testing.T) {

	assertEquals := func(t *testing.T, got string, expected string) {
		t.Helper()

		if got != expected {
			t.Errorf("got %q, expected %q", got, expected)
		}
	}

	t.Run("should encode string to base64", func(t *testing.T) {
		assertEquals(t, Base64Encode("Hello World"), "SGVsbG8gV29ybGQ=")
	})

	t.Run("should decode string from base64", func(t *testing.T) {
		assertEquals(t, Base64Decode("SGVsbG8gV29ybGQ="), "Hello World")
	})

	t.Run("should encode using percent encoding", func(t *testing.T) {
		assertEquals(
			t,
			UrlEncode("http://www.example.com/?a=$123"),
			"http%3A%2F%2Fwww.example.com%2F%3Fa%3D%24123",
		)
	})

	t.Run("should decode using percent encoding", func(t *testing.T) {
		assertEquals(
			t,
			UrlDecode("http%3A%2F%2Fwww.example.com%2F%3Fa%3D%24123"),
			"http://www.example.com/?a=$123",
		)
	})

}
