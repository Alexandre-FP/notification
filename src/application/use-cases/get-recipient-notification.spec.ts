import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { GetRecipientNotification } from './get-recipient-notification';

describe('Count recipient notifications', () => {
  it('should be able count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notification } = await getRecipientNotification.execute({
      recipientId: 'recipientId',
    });

    expect(notification).toHaveLength(2);
    expect(notification).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId' }),
        expect.objectContaining({ recipientId: 'recipientId' }),
      ]),
    );
  });
});
