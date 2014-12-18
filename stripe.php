<?php

require 'vendor/autoload.php';
require '../secret.php';

if ($_POST) {
	Stripe::setApiKey($secret['stripe']['secret_key']);
	$error = '';
	$success = '';
	
	try {
		if (!isset($_POST['stripeToken'])) {
			throw new Exception("The Stripe Token was not generated correctly");
		}
// var_dump($_POST);
		Stripe_Charge::create([
			"amount" => $_POST['amount'],
			"currency" => "gbp",
			"card" => $_POST['stripeToken']
		]);
		
		header('Location: /thanks.html');
	}
	catch (Exception $e) {
		$error = $e->getMessage();
		var_dump($error);
	}
}

?>
