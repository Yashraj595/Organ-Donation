<?php

$fullname = $_POST("fullname");
$email = $_POST("email");
$dob = $_POST("dob");
$gender = $_POST("gender")[0]; // Assuming gender is a single value
$bloodgroup = $_POST("bloodgroup")[0]; // Assuming blood group is a single value
$organs = implode(", ", $_POST("organs"));
$tissues = implode(", ", $_POST("tissues"));
$height = $_POST("height");
$weight = $_POST("weight");
$med_history = $_POST("med_history");
$mothers_name = $_POST("mothers_name");
$fathers_name = $_POST("fathers_name");
$address = $_POST("address");
$city = $_POST("city");
$district = $_POST("district");
$state = $_POST("state");
$pincode = $_POST("pincode");
$mobile = $_POST("mobile");
$emergency_contact_name = $_POST("emergency_contact_name");
$emergency_contact_address = $_POST("emergency_contact_address");
$identity_card_number = $_POST("identity_card_number");

var_dump($fullname, $email, $dob, $gender, $bloodgroup, $organs, $tissues, $height, $weight, $med_history, $mothers_name, $fathers_name, $address, $city, $district, $state, $pincode, $mobile, $emergency_contact_name, $emergency_contact_address, $identity_card_number)
