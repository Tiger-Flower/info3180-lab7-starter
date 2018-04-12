from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from wtforms import TextAreaField

class UploadForm(FlaskForm):
         photo = FileField('photo', validators=[FileRequired(),FileAllowed(['jpg', 'png','Images only!'])])
         description =TextAreaField('description',validators=[DataRequired()])