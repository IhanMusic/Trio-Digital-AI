import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://tchin-lait-cluster:xsQr952JGsZbAG6E@tchin-lait-cluster.hmvg58v.mongodb.net/tchin-lait-cluster?retryWrites=true&w=majority&appName=tchin-lait-cluster';

async function testConnection() {
  console.log('🔍 Test de connexion MongoDB...\n');
  console.log('URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
  
  try {
    console.log('\n⏳ Connexion en cours...');
    await mongoose.connect(MONGODB_URI);
    
    console.log('✅ CONNEXION RÉUSSIE !');
    console.log('📊 Base de données:', mongoose.connection.db?.databaseName);
    
    // Liste les collections existantes
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('\n📦 Collections trouvées:', collections.length);
      collections.forEach((col: any) => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Test d'écriture simple
    console.log('\n✍️ Test d\'écriture...');
    const TestModel = mongoose.model('test', new mongoose.Schema({ message: String, date: Date }));
    const doc = await TestModel.create({ 
      message: 'Test de connexion Render',
      date: new Date()
    });
    console.log('✅ Écriture réussie - ID:', doc._id);
    
    // Nettoyage
    await TestModel.deleteOne({ _id: doc._id });
    console.log('🧹 Document de test supprimé');
    
    await mongoose.connection.close();
    console.log('\n🎉 TOUT FONCTIONNE PARFAITEMENT !');
    console.log('\n📝 Actions à faire :');
    console.log('   1. Allez sur Render → Environment');
    console.log('   2. Modifiez MONGODB_URI avec cette valeur');
    console.log('   3. Sauvegardez (Render va redémarrer)');
    console.log('   4. Attendez 2-3 minutes');
    console.log('   5. Votre app sera en ligne ! 🚀');
    
  } catch (error: any) {
    console.error('\n❌ ERREUR DE CONNEXION :');
    console.error(error.message);
    
    if (error.message && error.message.includes('IP')) {
      console.log('\n💡 Solution : Ajoutez 0.0.0.0/0 dans Network Access de MongoDB Atlas');
    }
  }
}

testConnection();
