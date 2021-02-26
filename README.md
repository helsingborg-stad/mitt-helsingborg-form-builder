# Mitt-Helsingborg-Form-Builder

A React website that provides a GUI for creating and editing the forms for mitt-helsingborg. 

## To install

Clone the repo, run `yarn install` .
Then create a .env file, and add to it (for example)

REACT_APP_MITTHELSINGBORG_IO=https://dev.api.helsingborg.io/forms3

 to point this tool at the dev-API. Or substitute with your own AWS resource. 
 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## A little technical overview, some notes for developers

This app is built around the form library Formik (https://github.com/formium/formik) which is a nice library for building forms in React. Formik keeps track of the form state in a big JSON object, which can be viewed by clicking the "Show JSON" toggle (displaying it at the bottom). 


The form that is displayed is built by some general components, found in /src/components/general/, of which the most important one is the MultipleInputField. This takes a few props, most importantly the fields prop, which is a list of FieldDescriptors, each one describing an input field, for example 
```
  {
    name: 'description',
    type: 'text',
    initialValue: '',
    label: 'Description',
    helpText:
      'Only to help editors of the form, not visible to the user. Add description if the function of the field is not clear.',
  }
```
will create a text-input, with no initial value, a label "Description" and a help-icon, which when clicked shows the passed help text. 
There's a number of different allowed types, which creates different types of inputs. Some of them requires extra info, like the type 'select' requires an extra parameter 'choices', and so on. 


Another important general component is the FieldArrayWrapper. This is essentially a repeater field, and is used when the MultipleInputField gets the type 'array'. In this case, you need to pass another inputField, which is the inputs that each repeater item should show. This inputField is usually again built out of a MultipleInputField, so there's some nice recursion here. 


Formik works by giving each inputfield an id, and as you go deeper in the JSON structure, these ids gets built up with dots, just like in usual JSON. And my input field components work the same way, so for example if I have a MultipleInputField with the id 'formInfo' , and it has a text input field with id 'name', then the value from this field ends up in 'formInfo.name' in the form state JSON, so that's all rather natural. With repeaters, the id just contains the index, like 'steps.0.label'. 

A very useful thing that Formik also gives us is the useFormikContext hook. This gives you access to the form state, and methods for manipulating it from any component inside the Formik form. This lets us create smart input components, without any excessive prop drilling. There's a few such smart inputs already in place, which has some special logic for writing logic conditionals, selecting the ids of input fields and so on, but here there's a lot of room for more 'smartness' which can be a serious help for editors. This is sort of the main issue of this formbuilder, because it still requires the editor to think like a developer and be pretty precise when editing the forms, because otherwise functionality can easily break or not work as intended. So by gradually making various inputs smart and only allowing valid choices etc., this is very helpful to the editors. 

### The preview

The preview is a little bit of a hack. The code for the preview is just some of the code from MittHelsingborg app, the parts for rendering the steps and the various components, copied over and simplified (since we don't need any of the logic, just the graphics), and converted to usual React rather than ReactNative (i.e. things like View -> div, and some changes to styling etc.). So the preview consumes the same kind of form data as the app does, and use the same FormField rendering logic and so on. 

