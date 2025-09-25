import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Créer des utilisateurs de test
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      nom: 'Alice Dupont',
      email: 'alice@example.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      nom: 'Bob Martin',
      email: 'bob@example.com',
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'charlie@example.com' },
    update: {},
    create: {
      nom: 'Charlie Brown',
      email: 'charlie@example.com',
      password: hashedPassword,
    },
  });

  console.log('👥 Utilisateurs créés:', { user1, user2, user3 });

  // Créer des tâches avec différentes dates pour tester l'auto-complétion
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const task1 = await prisma.task.create({
    data: {
      titre: 'Réunion d\'équipe',
      description: 'Réunion hebdomadaire avec l\'équipe de développement',
      etat: 'ENCOURS',
      userId: user1.id,
      startDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), // Dans 2h
      endDate: new Date(now.getTime() + 4 * 60 * 60 * 1000),   // Dans 4h
      photo: '/uploads/1757886351864-36789fm4.jpg',
    },
  });

  const task2 = await prisma.task.create({
    data: {
      titre: 'Tâche expirée (auto-complétée)',
      description: 'Cette tâche devrait être automatiquement marquée comme terminée',
      etat: 'ENCOURS',
      userId: user1.id,
      startDate: yesterday,
      endDate: yesterday, // Déjà expirée
    },
  });

  const task3 = await prisma.task.create({
    data: {
      titre: 'Développement Frontend',
      description: 'Implémenter la nouvelle interface utilisateur',
      etat: 'ENCOURS',
      userId: user2.id,
      startDate: tomorrow,
      endDate: nextWeek,
      audio: '/uploads/1758725814039-qdbm6lhu.ogg',
    },
  });

  const task4 = await prisma.task.create({
    data: {
      titre: 'Tâche partagée',
      description: 'Tâche collaborative entre plusieurs utilisateurs',
      etat: 'ENCOURS',
      userId: user1.id,
      allowedUsers: {
        connect: [{ id: user2.id }, { id: user3.id }]
      },
      startDate: new Date(now.getTime() + 6 * 60 * 60 * 1000), // Dans 6h
      endDate: new Date(now.getTime() + 8 * 60 * 60 * 1000),   // Dans 8h
      photo: '/uploads/1758493682016-9k8rahp7.jpg',
    },
  });

  const task5 = await prisma.task.create({
    data: {
      titre: 'Revue de code',
      description: 'Réviser le code de la nouvelle fonctionnalité',
      etat: 'TERMINER',
      userId: user3.id,
      startDate: new Date(now.getTime() - 3 * 60 * 60 * 1000), // Il y a 3h
      endDate: new Date(now.getTime() - 1 * 60 * 60 * 1000),   // Il y a 1h
      audio: '/uploads/1758728638752-a44fjvcn.webm',
    },
  });

  console.log('📋 Tâches créées:', { task1, task2, task3, task4, task5 });

  // Créer quelques entrées d'historique
  await prisma.actionHistory.create({
    data: {
      action: 'CREATE',
      details: 'Création de la tâche via seed',
      taskId: task1.id,
      userId: user1.id,
    },
  });

  await prisma.actionHistory.create({
    data: {
      action: 'UPDATE',
      details: 'Modification de la description',
      taskId: task3.id,
      userId: user2.id,
    },
  });

  console.log(' Historique créé');

  console.log(' Base de données seedée avec succès!');
  console.log('\n Comptes de test:');
  console.log('   alice@example.com / password123');
  console.log('   bob@example.com / password123');
  console.log('   charlie@example.com / password123');
  console.log('\n Note: La tâche "Tâche expirée" sera automatiquement complétée par le système');
}

main()
  .catch((e) => {
    console.error(' Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });