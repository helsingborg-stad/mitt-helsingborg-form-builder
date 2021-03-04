[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p>
  <a href="https://github.com/helsingborg-stad/dev-guide">
    <img src="images/hbg-github-logo-combo.png" alt="Logo" width="300">
  </a>
</p>
<h3>Mitt Helsingborg Form Builder</h3>
<p>
  A React website that provides a GUI for creating and editing the forms for mitt-helsingborg. 
  <br />
  <a href="https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/issues">Report Bug</a>
  ·
  <a href="https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/issues">Request Feature</a>
</p>




## Installation

1. Clone the repo, run `yarn install` .
2. Then create a .env file, and add to it (for example)

```
REACT_APP_MITTHELSINGBORG_IO=https://api.example.com/forms
```
to point this tool at the API. Or substitute with your own AWS resource. 
 
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
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


## Deploy
Deploy pipelines for AWS is supplied in the .deploy folder using AWS Cloudformation.
The templates assume a multi account AWS setup where a certain pipeline account holds a CodePipeline that deploys to seperate test/dev/stage/production accounts.  

These templates have to be modified to fit you account structure or need.  

### Requirements
- AWS cli
- AWS account

### SSM parameters
There are required parameters to be set in the CodePipeline account for this setup to work.  

| SSM parameter                           | Value                          |
| --------------------------------------- | ------------------------------ |
| mitt-hbg-api-domain-production          | Production env api domain      |
| mitt-hbg-api-domain-stage               | Stage env api domain           |
| mitt-hbg-api-domain-develop             | Develop env api domain         |
| mitt-hbg-api-domain-test                | Test env api domain            |
| mitt-hbg-aws-account-id-production      | Production AWS account id      |
| mitt-hbg-aws-account-id-stage           | Stage AWS account id           |
| mitt-hbg-aws-account-id-develop         | Develop AWS account id         |
| mitt-hbg-aws-account-id-test            | Test AWS account id            |
| mitt-hbg-form-builder-domain-production | Production form builder domain |
| mitt-hbg-form-builder-domain-stage      | Stage form builder domain      |
| mitt-hbg-form-builder-domain-develop    | Develop form builder domain    |
| mitt-hbg-form-builder-domain-test       | Test form builder domain       |
  

### Create pipeline
Make sure you have AWS access profile setup in your aws credentials file and modify the --profile command to match your pipeline account profile.
From this project root.  
Create pipeline stack:
```
aws cloudformation create-stack --stack-name mitt-hbg-pipeline-production --template-body file://$PWD/.deploy/cloudformation/pipelines/production/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
aws cloudformation create-stack --stack-name mitt-hbg-pipeline-test --template-body file://$PWD/.deploy/cloudformation/pipelines/test/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
aws cloudformation create-stack --stack-name mitt-hbg-pipeline-develop --template-body file://$PWD/.deploy/cloudformation/pipelines/develop/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
```
Update pipeline stack:
```
aws cloudformation update-stack --stack-name mitt-hbg-pipeline-production --template-body file://$PWD/.deploy/cloudformation/pipelines/production/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
aws cloudformation update-stack --stack-name mitt-hbg-pipeline-test --template-body file://$PWD/.deploy/cloudformation/pipelines/test/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
aws cloudformation update-stack --stack-name mitt-hbg-pipeline-develop --template-body file://$PWD/.deploy/cloudformation/pipelines/develop/stack.yml --capabilities CAPABILITY_NAMED_IAM --profile your-pipeline-account-profile-name
```
Delete pipeline stack:
```
aws cloudformation delete-stack --stack-name mitt-hbg-pipeline-production 
aws cloudformation delete-stack --stack-name mitt-hbg-pipeline-test
aws cloudformation delete-stack --stack-name mitt-hbg-pipeline-develop
```

### Environment account IAM roles.
This setup assumes you have these IAM roles setup on your prod/stage/test/dev accounts.  
Recommended to use Cloudformation stacksets to push these from a central AWS account.  
Modify any names to fit your needs and make sure to replace {PipelineAccountId} with your pipeline AWS account ID.  

PipelineRole:
```yml
  IAMRolePipeline:
    Type: AWS::IAM::Role
    Properties:
      RoleName: PipelineRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          -
            Effect: Allow
            Principal:
              AWS:
                - arn:aws:iam::{PipelineAccountId}:root
            Action:
              - sts:AssumeRole
      Path: /

  IAMPolicyPipeline:
    Type: AWS::IAM::Policy
    Properties:
      PolicyName: PipelinePolicy
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          -
            Effect: Allow
            Action:
              - cloudformation:*
              - s3:*
              - iam:PassRole
            Resource: "*"
          -
            Effect: Allow
            Action:
              - kms:*
            Resource: "*"
      Roles:
        - !Ref IAMRolePipeline
```
  
ServerlessDeployRole:
```yml
  IAMRoleServerlessDeploy:
    Type: AWS::IAM::Role
    Properties:
      RoleName: ServerlessDeployRole
      AssumeRolePolicyDocument:
        Version: 2012-10-17
        Statement:
          - Effect: Allow
            Principal:
              AWS:
                - arn:aws:iam::{PipelineAccountId}:root
                - !Sub arn:aws:iam::${AWS::AccountId}:root
            Action:
              - sts:AssumeRole
      Path: /

  IAMPolicyServerlessDeploy:
    Type: AWS::IAM::Policy
    Properties:
      PolicyName: ServerlessDeployPolicy
      PolicyDocument:
        Version: 2012-10-17
        Statement:
          - Sid: s3
            Effect: Allow
            Action:
              - s3:*
            Resource: "*"
          - Sid: logs
            Effect: Allow
            Action:
              - logs:*
            Resource: "*"
          - Sid: route53
            Effect: Allow
            Action:
              - route53:*
            Resource: "*"
```


## Roadmap

See the [open issues][issues-url] for a list of proposed features (and known issues).



## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## License

Distributed under the [MIT License][license-url].




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/helsingborg-stad/mitt-helsingborg-form-builder.svg?style=flat-square
[contributors-url]: https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/helsingborg-stad/mitt-helsingborg-form-builder.svg?style=flat-square
[forks-url]: https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/network/members
[stars-shield]: https://img.shields.io/github/stars/helsingborg-stad/mitt-helsingborg-form-builder.svg?style=flat-square
[stars-url]: https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/stargazers
[issues-shield]: https://img.shields.io/github/issues/helsingborg-stad/mitt-helsingborg-form-builder.svg?style=flat-square
[issues-url]: https://github.com/helsingborg-stad/mitt-helsingborg-form-builder/issues
[license-shield]: https://img.shields.io/github/license/helsingborg-stad/mitt-helsingborg-form-builder.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/helsingborg-stad/mitt-helsingborg-form-builder/master/LICENSE