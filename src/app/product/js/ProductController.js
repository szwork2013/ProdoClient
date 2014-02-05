
  /* Overview: Product Controller 
   * Controller for product comments,product features etc
   * Dated: 25/11/2013.
   * Author: Bhagyashri Jangam
   * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
   * Change History:
   *
   * date | author | description 
   *
   * 27-3/2013 | xyx | Add a new property
   * 
   */
   angular.module('prodo.ProductApp')
   .controller('ProductController', ['$scope','$log', '$rootScope', 'ProductService', 'UserSessionService','$http','CommentLoadMoreService','ENV','TagReffDictionaryService', function($scope, $log,$rootScope, ProductService, UserSessionService,$http,CommentLoadMoreService,ENV,TagReffDictionaryService) {

              //comments
              $scope.productComments = {comments: [{}]};
              $scope.newProductComment = [];
              $rootScope.productCommentResponsearray = [];
              $scope.mytags;
              $scope.count = 0;
              $scope.commenttextField = {userComment: ''};
              $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
              'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
              'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
              'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];
              $scope.productcommentResponseListener;
              var abc;

              //product
              $scope.editStatus;
              $scope.product = {product: [{}]};
              $scope.newProduct = {product: [{}]};
              $scope.type = "product";
              $rootScope.product_prodle;
              $rootScope.orgid;
              $scope.pImages_l = {product_images: [{}]};
              // $scope.uploadSrc="product";

              //user
              $scope.userIDFromSession;
              $scope.usernameFromSession;
              $scope.grpnameFromSession;
              $scope.orgnameFromSession;
              $scope.orgidFromSession;
              $scope.socket;

               //socket listener here
                
                TagReffDictionaryService.getAllTags(
                  function(successData) {
                   // $scope.pretags=successData.success;

                  })
                  


               
               $rootScope.$on("product", function(event, data){

                 $rootScope.product_prodle=data.prodle;
                 $rootScope.orgid=data.orgid;
               });

              // $rootScope.product_prodle='xkdiPXcT_';
              // $rootScope.orgid='orgxkpxhIFau'; 


            //get login details
            $scope.getUserDetails = function( ) {
              if ($rootScope.usersession.currentUser.org) {
                $scope.grpnameFromSession = $rootScope.usersession.currentUser.org.grpname;
                $scope.orgidFromSession = $rootScope.usersession.currentUser.org.orgid;
                $scope.orgnameFromSession = $rootScope.usersession.currentUser.org.orgname;

              }
              else {
                $scope.grpnameFromSession = "";
                $scope.orgnameFromSession = "";
                $scope.orgidFromSession = "";
              }
              $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
              $scope.usernameFromSession = $rootScope.usersession.currentUser.username;
            }
            $scope.getUserDetails();

              //get login details
                //get product function declaration
                $scope.getProduct = function()
                {

                  ProductService.getProduct({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle},
                    function(successData) {
                      if (successData.success == undefined)
                      {
                       var temp=document.getElementById('prodo-comment-container');
                       $log.debug(temp);
                       if($rootScope.usersession.currentUser.org.isAdmin==true)
                       {
                         $("#prodoCommentsTab").css("display", "none");
                         $("#tabComments").css("display", "none");
                       // $( "#prodoProductFeaturesTab" ).addClass( "active" );
                       $("#prodo.productAdmin").css("display", "inline"); 

                       $("#tabproductupload").css("display", "inline");
                       $("#prodoUploadTab").css("display", "inline");    
                        // document.getElementById("prodo.productAdmin").style.display = 'inline';
                        // document.getElementById("prodoUploadTab").style.display = 'inline';
                      }
                      else {
                       temp.innerHTML="<br>Please start following a product using search...<br><br>";
                       $scope.showAlert('alert-danger', " Product not available ...");
                     }
                   }
                   else {
                    $log.debug(successData.success.product);
                  //                $log.debug("success    "+successData);
                  $scope.product = successData.success.product;
                  $rootScope.product_prodle = successData.success.product.prodle;
                  $scope.productComments = successData.success.product.product_comments;
                  $scope.pImages_l = successData.success.product.product_images;
                  if(successData.success.product.product_comments.length==0){
                    $("#load-more").css("display", "none");
                  }
                  else  $("#load-more").css("display", "inline");

                  }

                  },
                  function(error) {
                    $log.debug(error);
                    var temp=document.getElementById('prodo-comment-container');
                    $log.debug(temp);
                    temp.innerHTML="<br> Server error please try after some time<br><br>";
                    $scope.showAlert('alert-danger', "Server Error:" + error.status);

                  });

                  }
              //get product function declaration  

              $scope.getProduct();    

              //Generate GUID
              function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
              }
              function guid() {
                return (  S4() + "-" + S4() +"-"+Date.now().toString());
              }
              //Generate GUID


              localStorage.sid = $rootScope.usersession.currentUser.sessionid;
              //socket connect
              $log.debug(ENV.apiEndpoint);
              $scope.socket = io.connect(ENV.apiEndpoint+ENV.port+'/api/prodoapp', {
                // $scope.socket = io.connect('http://localhost/prodoapp', {
                  query: 'session_id=' + localStorage.sid
                });
              //socket connect

              //socket response when for add comment

              $scope.socket.removeAllListeners('addcommentResponse');
              $scope.socket.on('addcommentResponse', function(error, result) {
                if (error) {
                  $log.debug(error.error.message);
                  $scope.showErrorIfCommentNotAdded();
                  $scope.showRetryIconIfCommentNotAdded();
                  // if(retry) retry.textContent("Error posting comment.. Please try again");
                } else if (result) {
                  // $log.debug(result.success.message);
                  $scope.ifErrorAddingComment = false;
                  $log.debug("addcommentResponse success" + result.success.product_comment);
                }
                //   $scope.socket.removeAllListeners();
              })
              //socket response when for add comment

              //on the fly comment listener creation

              //productComment response
              
              $scope.productcommentResponseListener="productcommentResponse"+$rootScope.product_prodle;
              
              $scope.socket.removeAllListeners($scope.productcommentResponseListener);
              

              $scope.socket.on($scope.productcommentResponseListener, function(error, result) {
                if (error) {
                  $log.debug(error.error.message);
                } else if (result) {
                  $log.debug("productcomment  Response success" + JSON.stringify(result.success.product_comment));
                //  $scope.productCommentResponsearray.push( JSON.stringify(result.success.product_comment));

                $scope.newProductComment = {
                  product_comment: {
                    user: {userid: result.success.product_comment.user.userid,
                      username: result.success.product_comment.user.username,
                      orgname: result.success.product_comment.user.orgname,
                      grpname: result.success.product_comment.user.grpname,
                      profilepic:result.success.product_comment.user.profilepic
                    },
                    commentid: result.success.product_comment.commentid,
                    type: result.success.product_comment.type,
                    datecreated: result.success.product_comment.datecreated,
                    commenttext: result.success.product_comment.commenttext

                  }};

                   // $scope.productCommentResponsearray.push($scope.newProductComment.product_comment);
                   $rootScope.productCommentResponsearray.push($scope.newProductComment.product_comment);
                   $log.debug($rootScope.productCommentResponsearray);
                   $scope.count = $rootScope.productCommentResponsearray.length;
                   $log.debug($scope.count);
                   var a = document.getElementById("responseComment");
                   a.style.display = 'inline';
                   a.innerHTML = $scope.count + ' new comments';
                  // a.textContent(JSON.stringify(result.success.product_comment).length + " new comments")
                }
                // $scope.socket.removeAllListeners();
              });
              //productComment response 
              $scope.commenttextField.userComment="";
              $scope.getTagsFromCommentText = function () {
                var commenttext = $scope.commenttextField.userComment;
                $scope.mytags = $scope.pretags;
                var new_arr = [];
                var commenttextTags = commenttext.split(' ');
                for (var i = 0; i < commenttextTags.length; i++) {
                  for (var j = 0; j < $scope.mytags.length; j++) {
                    if (commenttextTags[i] == $scope.mytags[j]) {
                      new_arr.push(commenttextTags[i]);
                    }
                  }
                }

                $scope.mytags = new_arr;

                $log.debug($scope.mytags);
              };

              //On the fly tags
              $scope.$watch('commenttextField.userComment', function() {

               $scope.getTagsFromCommentText();
               if($scope.mytags.length == 0){
                $("#prodo-productTags").css("display", "none"); 

              }
              else {  
               $("#prodo-productTags").css("display", "inline");
               document.getElementById('prodo-comment-commentContainer').style.marginTop='80px';  
             }
           });

              $scope.$watch('mytags', function() {
                $scope.mytags;
               $log.debug("tags "+$scope.mytags);
              })              
              //Add comment function

              $scope.addProductComment = function() {

               // $scope.getTagsFromCommentText($scope);

               $log.debug($rootScope.file_data);
               $log.debug($rootScope.comment_image_l);
                // if($rootScope.file_data==undefined){
                  if (($rootScope.file_data == "") || ($rootScope.file_data == " ") || ($rootScope.file_data == undefined) || ($rootScope.file_data == null)) {
                   $scope.newProductComment = {
                    product_comment: {
                      user: {userid: $scope.userIDFromSession,
                        username: $scope.usernameFromSession,
                        orgname: $scope.orgnameFromSession,
                        grpname: $scope.grpnameFromSession,
                        profilepic:$rootScope.usersession.currentUser.profile_pic
                      },
                      commentid: guid(),
                      type: $scope.type,
                      datecreated: Date.now(),
                      tags:$scope.mytags,
                      commenttext: $scope.commenttextField.userComment

                    }};

                    $scope.newProductComment_image = {
                      product_comment: {
                        user: {userid: $scope.userIDFromSession,
                          username: $scope.usernameFromSession,
                          orgname: $scope.orgnameFromSession,
                          grpname: $scope.grpnameFromSession,
                          profilepic:$rootScope.usersession.currentUser.profile_pic
                        },
                        commentid: guid(),
                        type: $scope.type,
                        datecreated: Date.now(),
                        tags:$scope.mytags,
                        commenttext: $scope.commenttextField.userComment

                      }};


                    }


                    else {


                      $scope.newProductComment = {
                        product_comment: {
                          user: {userid: $scope.userIDFromSession,
                            username: $scope.usernameFromSession,
                            orgname: $scope.orgnameFromSession,
                            grpname: $scope.grpnameFromSession,
                            profilepic:$rootScope.usersession.currentUser.profile_pic
                          },
                          commentid: guid(),
                          type: $scope.type,
                          datecreated: Date.now(),
                          commenttext: $scope.commenttextField.userComment,
                          tags:$scope.mytags,
                          comment_image:$rootScope.file_data
                        }};

                        $scope.newProductComment_image = {
                          product_comment: {
                            user: {userid: $scope.userIDFromSession,
                              username: $scope.usernameFromSession,
                              orgname: $scope.orgnameFromSession,
                              grpname: $scope.grpnameFromSession,
                              profilepic:$rootScope.usersession.currentUser.profile_pic
                            },
                            commentid: guid(),
                            type: $scope.type,
                            datecreated: Date.now(),
                            tags:$scope.mytags,
                            commenttext: $scope.commenttextField.userComment,
                            comment_image:$rootScope.comment_image_l
                          }};
                          $rootScope.file_data="";

                        }
                        $log.debug($scope.newProductComment);

                // var action = {product: {userid: $scope.userIDFromSession, orgid: $scope.orgidFromSession, prodle: $scope.product_prodle}};

                if ($scope.commenttextField.userComment !== "")

                {
                  //  $scope.getTagsFromCommentText($scope);
                  $scope.socket.emit('addComment', $rootScope.product_prodle, $scope.newProductComment.product_comment);
                  $scope.productComments.unshift($scope.newProductComment_image.product_comment);
                  $scope.commenttextField.userComment = "";
                  $rootScope.count=0;
                  document.getElementById('prodo-comment-commentContainer').style.marginTop='0px';
                  document.getElementById("crossButton").style.display="none";
                  var element=document.getElementById('prodo-uploadedCommentImage');
                  if (typeof(element) != 'undefined' && element != null)
                  {
                    element.parentNode.removeChild(element);
                      // exists.
                    }


                  }

                };
              //Add comment function


              //   $log.debug(ProductService.getProduct({prodle: 'eyYHSKVtL'}));

              //get latest comments posted by others
              $scope.getLatestComments = function() {
                $log.debug($rootScope.productCommentResponsearray);
                $scope.reversecomments_l = $scope.productCommentResponsearray.reverse();
                $log.debug($scope.reversecomments_l);
                $scope.productComments = $scope.reversecomments_l.concat($scope.productComments);
                $log.debug($scope.productComments);
                var a = document.getElementById("responseComment");
                a.style.display = 'none';
                a.innerHTML = "";
                $scope.productCommentResponsearray.length = 0;
                $scope.reversecomments_l.length = 0;
                $scope.count = 0;
                //code to get latest comments
              };
              //get latest comments posted by others

              //error handling for add product
              $scope.handleSaveProductResponse = function(data) {
                if (data.success) {
                  $scope.showAlert('alert-success', data.success.message);
                } else {
                  if (data.error.code == 'AV001') {     // user already exist
                    $log.debug(data.error.code + " " + data.error.message);
                    $scope.showAlert('alert-danger', data.error.message);
                   } else if (data.error.code == 'AP001') {  // user data invalid
                    $log.debug(data.error.code + " " + data.error.message);
                    $scope.showAlert('alert-danger', data.error.message);
                  } else {
                    $log.debug(data.error.message);
                    $scope.showAlert('alert-danger', data.error.message);
                  }
                }
              };
              //error handling for add product

              //add ,update product
              $scope.addProduct = function(editStatus)
              {


                $scope.newProduct = {product: {
                  display_name: $scope.display_name,
                  serial_no: $scope.product.serial_no,
                  model_no: $scope.product.model_no,
                  name: $scope.product.name,
                  description: $scope.product.description
                }};


                if(editStatus=='add'){
                 if ($rootScope.usersession.currentUser.org.isAdmin ) {
                  ProductService.saveProduct({orgid: $scope.orgidFromSession}, $scope.newProduct,
                    function(success) {
                      $log.debug(success);
                            $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                          },
                          function(error) {
                            $log.debug(error);
                          });
                }
                else $scope.showAlert('alert-danger', "You dont have rights to add product..."); 
              }
              else if(editStatus=='update'){
                if ($rootScope.usersession.currentUser.isAdmin ) {
                  if ($scope.orgidFromSession === $rootScope.orgid ) {
                   ProductService.updateProduct({orgid:$scope.orgidFromSession,prodle:$rootScope.product_prodle}, $scope.newProduct,
                    function(success) {
                      $log.debug(success);
                            $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                          },
                          function(error) {
                            $log.debug(error);
                          });
                 }
               }
               else $scope.showAlert('alert-danger', "You dont have rights to update this product..."); 
             }

           };
              //delete product
              $scope.deleteProduct = function()
              {
                if ($rootScope.usersession.currentUser.isAdmin ) {
                  if ($scope.orgidFromSession === $rootScope.orgid ) {
                    ProductService.deleteProduct({orgid: $scope.orgidFromSession, prodle: $rootScope.product_prodle});
                  }
                }
                else
                 $scope.showAlert('alert-danger', "You dont have rights to delete this product...");
             }
              //delete product

              $scope.ShowDiscontinuedSupport=function(product){
               if (product.support_discontinuation_date) return{display: "inline" } 
                 else return{display: "none" } 
               } 
             $scope.ShowDiscontinuedSale=function(product){
               if (product.sale_discontinuation_date) return{display: "inline" } 
                 else return{display: "none" }              
               } 
             $scope.ShowBannedDate=function(product){
               if (product.banneddate) {
                return{display: "inline" } 
              }
            } 

            $scope.hideIfNotUser = function(userid) {
              if (userid) {
                if (userid !== $scope.userIDFromSession) {
                  return {display: "none"}
                }
              }
            }

            $scope.hideIfNoOrg = function(orgname) {
              if ((orgname == "") || (orgname == " ") || (orgname == undefined) || (orgname == null)) {
                return{display: "none"}
              }
            }
            $scope.hideIfNogrp = function(grpname) {
              if ((grpname == "") || (grpname == " ") || (grpname == undefined) || (grpname == null)) {
                return{display: "none"}
              }
            }
            $scope.hideIfNotImage=function(image){
             if ((image == "") || (image == " ") || (image == undefined) || (image == null)) {
              return{display: "none"}
            }
          } 

          $scope.showErrorIfCommentNotAdded = function( ) {
            var retry = document.getElementById("responseComment");
            retry.style.display = 'inline';
            retry.innerHTML = 'Error adding comment please try again..';
          }

          $scope.showRetryIconIfCommentNotAdded = function( ) {
            var retryIcon = document.getElementById("retryIcon");
            retryIcon.style.display = 'inline';
          }


         //toggle to select all product iamges
         $scope.masterChange = function() { 
  //                $(this).closest('div').find('.thumb :checkbox').prop("checked", this.checked);
            if ($('.imgToggles').is(':checked')) {
              $('.imgToggles').prop('checked', false)
            } else {
              $('.imgToggles').prop('checked', true)
            }
            };

            $scope.chckedIndexs=[];
            $scope.checkedIndex = function (img) {
             if ($scope.chckedIndexs.indexOf(img) === -1) {
               $scope.chckedIndexs.push(img);
             }
             else {
               $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(img), 1);
             }
             $log.debug($scope.chckedIndexs);
            }
            
            //delete images
            $scope.deleteProductImages = function(index) {
                //get selected ids to delete images
                $scope.imgIds = [{}];
                $scope.ids;

                $(':checkbox:checked').each(function(i) {

                  $scope.imgIds[i] = $(this).val();
                  $scope.ids=  $(this).val();               
                });
                

                angular.forEach($scope.chckedIndexs, function (value, index) {
                  $log.debug("value= "+value);
                  var index = $scope.pImages_l.indexOf(value);
                  $scope.pImages_l.splice($scope.pImages_l.indexOf(value), 1);
                });
                $scope.chckedIndexs = [];


                $scope.temp={prodleimageids:$scope.imgIds}
                

                $http({
                  method: 'DELETE',
                  url: ENV.apiEndpoint_notSocket+'/api/image/product/' + $scope.orgidFromSession + '/' + $rootScope.product_prodle +'?prodleimageids='+$scope.imgIds ,
                      // data: {'prodleimageids':[ $scope.imgIdsJson]}
                    }).success(function(data, status, headers, cfg) {
                      $log.debug(data);
                    }).error(function(data, status, headers, cfg) {
                     $log.debug(status);
                   });

                  };


               if($rootScope.usersession.currentUser.org){
                if ($rootScope.usersession.currentUser.org.isAdmin) {
                  if ($scope.orgidFromSession === $rootScope.orgid ) {
                    $rootScope.isAdminCheck=true;
                  }
                }
               } 
               $scope.checkAdmin = function() {
                if ($rootScope.isAdminCheck==true){
                 var adminPanel = document.getElementById("prodo.productAdmin");
                 adminPanel.style.display = 'inline';
               }
             }

             $scope.checkAdminProductUpload=function() {
              if ($rootScope.isAdminCheck==true)
                $("#Upload-clck").css("display", "block");      

            }
            $scope.checkAdminProductUpload();


            $scope.checkAdminProductImagesDelete=function() { 

              if ($rootScope.isAdminCheck==true) {
                return{display: "inline"}
              }
              else {
                return{display: "none"}
              }
            };


            $scope.formatDate=function(time)
            {
              return(moment(time).format('DD MMM YYYY'));
            };


       //on the fly drag zone height and width
         $(document).ready(function () {
          $('#holder').hover(
            function() {
                  // $log.debug( 'hovering on' , $(this).attr('id') ); 

                  var txtheight=$( "#prodo-comment-Textbox" ).height();
                   //     $log.debug(txtheight);
                   var txtwidth=$( "#prodo-comment-Textbox" ).width();
                   document.getElementById("holder").style.height=txtheight;
                   document.getElementById("holder").style.width=txtwidth;
                   txtwidth="";
                   txtheight="";
                  // console.log(a); 


                }, 
                function() {

                 // $log.debug( 'hovering out' , $(this).attr('id') );
                   // var txtheight=$( "#prodo-comment-Textbox" ).height();
                //    var txtwidth=$( "#prodo-comment-Textbox" ).width();
                document.getElementById("holder").style.height='40px';
                   // document.getElementById("prodo-comment-Textbox").style.height='45px';
                //    txtwidth="";
                //    txtheight="";

              }
              );
          });

            $scope.handleLoadMoreCommentResponse=function(result){
             console.log(result);
             if(result.success != undefined){
               $log.debug(result.success.comment );
               for (var i = 0; i < result.success.comment.length; i++) {
                $scope.productComments.push(result.success.comment[i]);
              };
            }
            else 
            {
              if(result.error.code=='AC002'){

                $("#loadMoreCommentMsg").html(result.error.message);
                $("#load-more").hide();
                $log.debug(result.error.message);
              }
              else  if(result.error.code=='AC001'){
                $log.debug(result.error.message);
                $("#loadMoreCommentMsg").html(result.error.message);
              }
              else {
                $log.debug(result.error.message);
                $("#loadMoreCommentMsg").html(result.error.message);
              }
            }
            };
            $("#load-more").show();
            $scope.getLastCommentId = function(){
             $log.debug( $scope.productComments);
             $scope.productComments;
             var lengthComments=$scope.productComments.length;
             $log.debug(lengthComments)
             var lastComment=$scope.productComments[lengthComments-1];
             $log.debug(lastComment.commentid);
             return lastComment.commentid;
            }


            $scope.loadMoreComments=function(){
              $("#img-spinner").show(); 
              var lastCommentId=$scope.getLastCommentId();
                    //call service
                    CommentLoadMoreService.loadMoreComments({commentid: lastCommentId},
                      function(result) {
                       $scope.handleLoadMoreCommentResponse(result)
                       $("#img-spinner").hide(); 
                     },
                     function(error) {
                      $log.debug(error);
                    });

                  }
                  $("#img-spinner").hide();

                  $(function () {
                    $("#prodo-comment-Textbox")
                    .popover({ title: 'How to add comment', content: "Add comment as product feature name and its performance..." })
                    .blur(function () {
                      $(this).popover('hide');
                    });
                  });


                }])




