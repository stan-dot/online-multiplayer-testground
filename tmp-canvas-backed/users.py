from flask import Blueprint, current_app as app

blueprint = Blueprint('prefix_uri', __name__)

@blueprint.route('/users/<username>', methods=['DELETE'])  # type: ignore
def del_user(username):
    # some specific code goes here
    # ...

    # call Eve-hooks consumers for this  event
    getattr(app, "users_deleted")(username)