import { IsNotEmpty, IsUUID, Length } from 'class-validator';

/* DTO: Data transfer object */
export class CreatedNotificationDTO {
  @IsNotEmpty() // esse decoretor é dizendo que não pode estar vazio
  @IsUUID() // esse decoretor é dizendo que essa propriedade precisa ser um UUID
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 240) // esse decoretor é para deixar o minimo e o maximo de caracteres
  content: string;

  @IsNotEmpty()
  category: string;
}
