# Mitt Helsingborg form builder - Deploy

## Table of Contents
- [Mitt Helsingborg form builder - Deploy](#mitt-helsingborg-form-builder---deploy)
  - [Table of Contents](#table-of-contents)
  - [Buildspecs](#buildspecs)
    - [buildspec.yml](#buildspecyml)
  - [Cloudformation](#cloudformation)
    - [Prerequisites](#prerequisites)
    - [Template imports](#template-imports)
    - [Serverless Deploy Role](#serverless-deploy-role)
    - [Parameter stores](#parameter-stores)
    - [Create/Update/Delete stack](#createupdatedelete-stack)
      - [Production/Staging/Test](#productionstagingtest)
      - [Develop](#develop)
      - [Release](#release)


## Buildspecs
Located in `.deploy/cloudformation/pipeline/` there are two buildspec files.  
These are used to run the codebuild steps in the pipelines.  

### buildspec.yml
This spec will build the static web page and deploy to the different account.  

## Cloudformation

### Prerequisites
You will need to install AWS CLI and configure your AWS credentials as default or use a profile.  
These examples assues you have a profile named `aws-pipelines-profile-name` with credentials that lets you access the pipelines account and create stacks.  

### Template imports
This import makes CodePipeline react to github-events, the connection is created in a different CFN stack located in a secure private repository.  
```
Fn::ImportValue: github-connection-CodeStarConnection
```

### Serverless Deploy Role
The ServerlessDeployRole is used in order to be able to push deploys to selected accounts ex. prod/stage/test/dev.  
The serverless role is created in a different CFN stack an located in a secure private repository.  

### Parameter stores
In the parameters section in the CFN template, parameter store values are fetched. These are created in a different CFN stack located in a secure private repository.  

### Create/Update/Delete stack
In project root folder, run these commands to create, update and delete pipelines.  

#### Production/Staging/Test
Production and staging is deployed in the same pipeline.  

Create:
```
aws cloudformation create-stack --stack-name mitt-helsingborg-form-builder-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/production/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Update:
```
aws cloudformation update-stack --stack-name mitt-helsingborg-form-builder-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/production/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Delete:
```
aws cloudformation delete-stack --stack-name mitt-helsingborg-form-builder-pipeline 
```

#### Develop
Create:
```
aws cloudformation create-stack --stack-name mitt-helsingborg-form-builder-develop-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/develop/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Update:
```
aws cloudformation update-stack --stack-name mitt-helsingborg-form-builder-develop-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/develop/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Delete:
```
aws cloudformation delete-stack --stack-name mitt-helsingborg-form-builder-develop-pipeline 
```

#### Release
Create:
```
aws cloudformation create-stack --stack-name mitt-helsingborg-form-builder-release-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/release/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Update:
```
aws cloudformation update-stack --stack-name mitt-helsingborg-form-builder-release-pipeline --template-body file://$PWD/.deploy/cloudformation/pipelines/release/stack.yml --capabilities CAPABILITY_NAMED_IAM 
```

Delete:
```
aws cloudformation delete-stack --stack-name mitt-helsingborg-form-builder-release-pipeline 
```