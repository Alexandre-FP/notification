import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './error/notification-not-found';
import { UnReadNotification } from './unread-notification';

describe('Unred Notification', () => {
  it('should be able to unread notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnReadNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação'),
      recipientId: 'recipientId',
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notification[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'notification.id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
