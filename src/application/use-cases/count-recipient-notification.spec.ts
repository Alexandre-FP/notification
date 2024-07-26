import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipient notifications', () => {
  it('should be able count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipientId',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipientId',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipientIdOne',
      }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipientId',
    });

    expect(count).toEqual(2);
  });
});
