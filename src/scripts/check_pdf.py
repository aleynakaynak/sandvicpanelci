import sys
try:
    from pypdf import PdfReader
    reader = PdfReader("ANASAYFA.pdf")
    print(f"Pages: {len(reader.pages)}")
    print("--- First Page Text ---")
    print(reader.pages[0].extract_text())
except ImportError:
    print("pypdf not installed")
except Exception as e:
    print(f"Error: {e}")
