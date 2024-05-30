import requests
from bs4 import BeautifulSoup
from analytics.normalization.normalizer import *
from file_manager import save_to_json

URL_TEMPLATE_1 = "https://artworld.ru/interernye-kartiny/"
URL_TEMPLATE_2 = "https://art-most.com/all_pictures/"
OK_STATUS_CODE = 200
MAX_PAGES = 14
FILENAME = "paintings.json"

def get_html(url):
    """
    Get the HTML code of a page from the given URL.
    Returns the HTML text or raises ValueError in case of an error.
    :param url: The URL of page to retrieve
    :return: The HTML code of the page
    """
    response = requests.get(url)
    if response.status_code != OK_STATUS_CODE:
        raise ValueError("Error while getting a page!")
    return response.text


def parse_paintings_1(html):
    """
    Extracts the data of a painting from website 1.
    Returns a dictionary with the painting data.
    :param html: HTML code of page
    :return: A dictionary with the painting data
    """
    soup = BeautifulSoup(html, "html.parser")
    images = soup.find_all("div", class_="item catalog-item-dev 222")

    paintings_data = []
    for image in images:
        title = normalize_title(image.find("p", class_="item-name").text.strip())
        artist = image.find("p", class_="author").text.strip()
        genre = normalize_genre(image.find("span", string="Жанр:").find_next("a").text.strip())
        style = normalize_style(image.find("span", string="Стиль:").find_next("a").text.strip())
        url = "https://artworld.ru/" + image.find("img")["src"]

        painting_data = {
            "title": title,
            "artist": artist,
            "genre": genre,
            "style": style,
            "url": url
        }
        paintings_data.append(painting_data)

    return paintings_data


def parse_paintings_2(html):
    """
    Extracts the data of a painting from website 2.
    Returns a dictionary with the painting data.
    :param html: HTML code of page
    :return: A dictionary with the painting data
    """
    soup = BeautifulSoup(html, "html.parser")
    images = soup.find("ul", class_="products columns-3")
    paintings_data = []
    for image in images.find_all("li"):
        title = normalize_title(image.find("h2", class_="woocommerce-loop-product__title").text.strip())
        artist = image.find("h3", class_="pa_artist").text.strip()
        genre = normalize_genre(image.find("p", class_="size").find_next("a").find_next("a").text.strip().capitalize())
        style = normalize_style(image.find("p", class_="size").find_next("a").text.strip())
        url = image.find("img")["src"]

        painting_data = {
            "title": title,
            "artist": artist,
            "genre": genre,
            "style": style,
            "url": url
        }
        paintings_data.append(painting_data)

    return paintings_data


def parse_pages():
    """
    Extracts the data of paintings from all pages.
    Saves the data to a JSON file.
    """
    url_data_1, url_data_2 = [], []
    for page in range(MAX_PAGES + 1):
        url_1 = f"{URL_TEMPLATE_1}?p={page}"
        url_2 = f"{URL_TEMPLATE_2}/page/{page + 1}/"
        html_1 = get_html(url_1)
        html_2 = get_html(url_2)
        page_data_1 = parse_paintings_1(html_1)
        url_data_1.extend(page_data_1)
        page_data_2 = parse_paintings_2(html_2)
        url_data_2.extend(page_data_2)
    all_paintings_data = url_data_1 + url_data_2
    save_to_json(all_paintings_data, FILENAME)


if __name__ == '__main__':
    try:
        parse_pages()
    except Exception as e:
        print(f'Error in parsing: {e}')
