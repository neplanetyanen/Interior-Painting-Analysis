import re


def normalize_title(title):
    """
    Normalizes painting title, removes extra words, leaves only title painting title
    :param title: old title
    :return: normalized title
    """
    title = title.strip()
    title = re.sub(r'\bКартина ', '', title, flags=re.IGNORECASE)
    match = re.search(r'"([^"]*)"', title)
    if match:
        title = match.group(1)
    else:
        title = re.sub(r'[«»]', '', title)
    return title


def normalize_genre(genre):
    """
    Normalizes painting genre, removes extra subgenres, making common genres
    :param genre: old genre
    :return: normalized genre
    """
    if 'пейзаж' in genre.lower():
        norm_genre = 'Пейзаж'
    elif 'натюрморт' in genre.lower():
        norm_genre = 'Натюрморт'
    else:
        common_genres = {
            "Животные": "Анималистика",
            "Картины с цветами": "Цветы",
            "Ню и эротика": "Ню",
        }
        norm_genre = common_genres.get(genre, genre)
    return norm_genre


def normalize_style(style):
    """
    Normalizes "Abstraction" painting style
    :param style: old style
    :return: normalized style
    """
    return 'Абстракционизм' if style == 'Абстракция' else style

