<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';


$data = json_decode(file_get_contents('php://input'), true);
$name = $data['nome'];
$email = $data['email'];
$subject = $data['assunto'];
$message = $data['mensagem'];


 $mail = new PHPMailer();
 $mail->IsSMTP(); 
 $mail->Host = "smtp.uni5.net"; // Seu endereço de host SMTP
 $mail->SMTPAuth = true; // Define que será utilizada a autenticação -  Mantenha o valor "true"
 $mail->Port = 587; // Porta de comunicação SMTP - Mantenha o valor "587"
 $mail->SMTPSecure = false; // Define se é utilizado SSL/TLS - Mantenha o valor "false"
 $mail->SMTPAutoTLS = true; // Define se, por padrão, será utilizado TLS - Mantenha o valor "false"
 $mail->Username = 'noreply@arcoverdeconsultoria.com.br'; // Conta de email existente e ativa em seu domínio
 $mail->Password = 'n@0B0707'; // Senha da sua conta de email
 // DADOS DO REMETENTE
 $mail->Sender = "noreply@arcoverdeconsultoria.com.br"; // Conta de email existente e ativa em seu domínio
 $mail->From = "noreply@arcoverdeconsultoria.com.br"; // Sua conta de email que será remetente da mensagem
 $mail->FromName = "noreply"; // Nome da conta de email
 // DADOS DO DESTINATÁRIO
 $mail->AddAddress('contato@arcoverdeconsultoria.com.br', '$name'); // Define qual conta de email receberá a mensagem
 //$mail->AddCC('copia@dominio.net'); // Define qual conta de email receberá uma cópia
 //$mail->AddBCC('copiaoculta@dominio.info'); // Define qual conta de email receberá uma cópia oculta
 // Definição de HTML/codificação
 $mail->IsHTML(true); // Define que o e-mail será enviado como HTML
 $mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)
 // DEFINIÇÃO DA MENSAGEM
 $mail->Subject  =$subject; // Assunto da mensagem
 $mail->Body .= " Nome: ".$name."
"; // Texto da mensagem
 $mail->Body .= " E-mail: ".$email."
"; // Texto da mensagem
 $mail->Body .= " Assunto: ".$subject."
"; // Texto da mensagem
 $mail->Body .= " Mensagem: ".nl2br($message)."
"; // Texto da mensagem
 // ENVIO DO EMAIL
 $enviado = $mail->Send();
 // Limpa os destinatários e os anexos
 $mail->ClearAllRecipients();
 // Exibe uma mensagem de resultado do envio (sucesso/erro)
 if ($enviado) {
   echo "Mensagem enviada com sucesso!";
 } else {
   echo "Não foi possível enviar o e-mail.";
   echo "Detalhes do erro: " . $mail->ErrorInfo;
 }