def get_options(choices):
    return list(
        map(
            lambda choice: {"id": choice[0], "label": choice[1]},
            choices,
        )
    )
