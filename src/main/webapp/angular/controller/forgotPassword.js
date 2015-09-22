'use strict'
angular.module('myApp').controller("forgotPassword", function ($scope,$location, commonServices,globalInfo) {
 
	
	$scope.pageLoaded = true;
	
	$scope.user={};
	$scope.user.errorMailContainer = false;
	$scope.successMessageContainer = false;	
	$scope.user.countryCode = "+1";
	$scope.user.hasErrorCond = false;
	
	// avaiable registration form container
	$scope.forgotEmailPasscontainer = true;
	$scope.forgotPasscontainer = false;	 
	$scope.CongratulationContainer = false;
	
	/*var searchObject = $location.search();
	$scope.user.tokenValue = $routeParams.tokenId;
	$scope.user.hostValue = $location.path();*/
	 
	
	
	$scope.reset = function() {
    $scope.$broadcast('show-errors-reset');
    $scope.user = {emailCode:"", phoneCode:"", password:"", confirmPassword:""};
	}
	
	//this function append "=" sign to cloud Name
	$scope.appendSign = function()
	{
		
		if($scope.user.cloudName && !($scope.user.cloudName.charAt(0) == "="))
		{
			$scope.user.cloudName = '='+$scope.user.cloudName;
			
		}
		
		
	
	}
	// function to submit user information
	$scope.submitForgotEmail = function(isValid,postUrl) {
	 
		if(isValid){
		
			if($scope.user.countryCode.charAt(0) == "+" && $scope.user.countryCode.charAt(1)== "+")
			{
				var newCountryCode = $scope.user.countryCode; 
				newCountryCode = newCountryCode.substring(1);
				$scope.user.userTel = newCountryCode+"."+$scope.user.userMobile; 
			}
			else if($scope.user.countryCode.charAt(0) == "+" && $scope.user.countryCode.charAt(1)!= "+")
			{
				$scope.user.userTel = $scope.user.countryCode+"."+$scope.user.userMobile; 
			}
			else if ($scope.user.countryCode.charAt(0) != "+"){
				$scope.user.userTel = "+"+$scope.user.countryCode+"."+$scope.user.userMobile; 
			}		 
			
			$scope.user.identifier = Math.floor((Math.random() *(10000-1000))+1000);
			//Updating paramters accordingly
			var dataObject= {
				emailAddress : $scope.user.userEmail,
				phoneNumber : $scope.user.userTel,
				identifier : $scope.user.identifier
    			
			};
			console.log(dataObject);
		 
			var apiUrl = {postUrl : 'csp/'+globalInfo.cspName+'/clouds/personalClouds/'+$scope.user.cloudName+'/forgotPassword'};
			 
			 
			commonServices.saveInfo(dataObject,apiUrl).then(function(result){	
			 
			 
				if(result.message == "Success" || result[0].message == 'Success'){
					 							  
					$scope.forgotEmailPasscontainer = false;
					$scope.forgotPasscontainer = true;					 
				}
				else
				{ 
					$scope.user.errorMailContainer = true;
					if(result[0].errorMessage){
					$scope.user.errorMessage = result[0].errorMessage;
					}
					else{
					$scope.user.errorMessage = "Error: Invalid request";
					}					 
				}
			});
		
		}else{
			$scope.user.hasErrorCond = true;
			 
		}
	} 
	
	// function to submit user information
	$scope.submitForgotInfo = function(isValid,postUrl) {
	 
	
		if(isValid){
		
		if($scope.user.password!=$scope.user.confirmPassword){
		
			$scope.errorMessageContainer = true;
			$scope.errorMessage = "Password and confirm password don't match";
			return false;
		
		}
			$scope.errorMessageContainer = false;
			$scope.successMessageContainer = false;	
			$scope.loading_contactsInfo = true;
			 
			 
			//Updating paramters accordingly
			var dataObject= {
				password : $scope.user.password,
				confirmPassword : $scope.user.confirmPassword,
				emailCode : $scope.user.emailCode,
				phoneCode : $scope.user.phoneCode,				
				identifier : $scope.user.identifier				
			};
			console.log(dataObject);
			 var apiUrl = {postUrl : 'csp/'+globalInfo.cspName+'/clouds/personalClouds/'+$scope.user.cloudName+'/resetPassword'};
			commonServices.saveInfo(dataObject,apiUrl).then(function(responseData){	
			 
			 
				if(responseData.message == "Success" || responseData[0].message == "Success"){
					 							  
					$scope.forgotPasscontainer = false;
					$scope.CongratulationContainer = true;					 
				}
				else
				{
					$scope.errorMessageContainer = true;
					if(responseData[0].errorMessage){
					$scope.errorMessage = responseData[0].errorMessage;
					}
					else{
					$scope.errorMessage = "Error: Invalid request";
					}					 
					
				}
			});
		}else{
			$scope.user.hasErrorCond = true;
			 
		}
	}
	
	 
	
	 
	
});