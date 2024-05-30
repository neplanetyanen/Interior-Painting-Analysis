import base64
import numpy as np
import cv2
from PIL import Image
import requests
import io
import sys
import json


PARSED_PAINTINGS_PATH = "C:\\Users\\user\\Documents\\baum\\it\\test\\ipa.io\\analytics\\parser\\paintings.json"
SELECTED_PAINTINGS_PATH = "C:\\Users\\user\\Documents\\baum\\it\\test\\ipa.io\\analytics\\model\\selected_paintings.json"


class ColorHistogramSimilarity:

    def __init__(self, bins: int = 32):
        self.bins = bins

    def calculate_histogram(self, image: np.ndarray) -> np.ndarray:
        hist = cv2.calcHist([image], [0, 1, 2], None, [self.bins] * 3, [0, 256] * 3)
        hist = cv2.normalize(hist, hist).flatten()
        return hist

    def calculate_similarity(self, source_hist: np.ndarray, target_hist: np.ndarray) -> float:
        return cv2.compareHist(source_hist, target_hist, cv2.HISTCMP_INTERSECT)


class InteriorPaintingMatcher:
    def __init__(self, color_metric):
        self.color_metric = color_metric

    def fetch_paintings(self, json_path):
        with open(json_path, 'r', encoding='utf-8') as f:
            paintings = json.load(f)
        return paintings

    def download_image(self, url):
        response = requests.get(url)
        image = Image.open(io.BytesIO(bytearray(response.content)), formats=["PNG", "JPEG", "JPG"])
        return np.array(image)

    def find_similar_paintings(self, interior_blob: bytes, json_path: str) -> list:
        interior_image = Image.open(io.BytesIO(base64.decodebytes(interior_blob)))
        interior_image_np = np.array(interior_image)
        interior_hist = self.color_metric.calculate_histogram(interior_image_np)
        paintings = self.fetch_paintings(json_path)
        similarity_scores = []

        for painting in paintings:
            try:
                painting_image_rgb = self.download_image(painting['url'])
                painting_hist = self.color_metric.calculate_histogram(painting_image_rgb)

                color_similarity = self.color_metric.calculate_similarity(interior_hist,painting_hist)

                similarity_scores.append((painting, color_similarity))
            except Exception as e:
                print(f"Error processing painting {painting['title']}: {e}")

        sorted_paintings = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
        return sorted_paintings[:5]

def save_to_json(data, filepath):
    """
    Saves the data to a JSON file by given filepath.
    If the file extension is not .json, raises ValueError.
    :param data: data to save
    :param filepath: path to JSON file
    """
    if not filepath.endswith(".json"):
        raise ValueError("Incorrect format of file (must be .json)!")
    else:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    json_path = PARSED_PAINTINGS_PATH
    color_metric = ColorHistogramSimilarity()
    with open(sys.argv[1]) as f:
        lines = f.read().replace('\n', '')
    interior_blob = bytes(lines, 'utf-8')
    matcher = InteriorPaintingMatcher(color_metric)

    similar_paintings = matcher.find_similar_paintings(interior_blob, json_path)

    similar_paintings_to_save = []
    for painting, similarity in similar_paintings:
        painting_data = {
            "title": painting["title"],
            "artist": painting["artist"],
            "genre": painting["genre"],
            "style": painting["style"],
            "url": painting["url"],
        }
        similar_paintings_to_save.append(painting_data)
    save_to_json(similar_paintings_to_save, SELECTED_PAINTINGS_PATH)


if __name__ == "__main__":
    main()
