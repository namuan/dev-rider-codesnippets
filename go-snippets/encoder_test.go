package main

import "testing"

func TestBase64(t *testing.T) {

	t.Run("should encode string to base64", func(t *testing.T) {
		got := Base64Encode("Hello World")
		expected := "SGVsbG8gV29ybGQ="

		if got != expected {
			t.Errorf("got %q, expected %q", got, expected)
		}
	})

	t.Run("should decode string from base64", func(t *testing.T) {
		got := Base64Decode("SGVsbG8gV29ybGQ=")
		expected := "Hello World"

		if got != expected {
			t.Errorf("got %q expected %q", got, expected)
		}
	})

}
