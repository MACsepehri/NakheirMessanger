def check_session(session):
    if not session:
        session["login"] = False
        session["profile"] = {}
        session["chats"] = []
    elif not session["login"]:
        return False
    else:
        return True