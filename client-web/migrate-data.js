import { MigrationService } from './supabase/migration.js';

async function runMigration() {
  console.log('🚀 Starting GTU Ventures Data Migration');
  console.log('=' .repeat(50));

  try {
    // Run the full migration
    await MigrationService.migrateAllData();

    // Verify the migration
    console.log('\n🔍 Verifying migration...');
    await MigrationService.verifyMigration();

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Test your website to ensure data loads correctly');
    console.log('2. Test the admin panel for editing content');
    console.log('3. Optionally clear localStorage: MigrationService.clearLocalStorage()');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure database tables were created successfully');
    console.log('2. Check your Supabase connection');
    console.log('3. Verify localStorage has the expected data format');
  }
}

// Export for browser console usage
if (typeof window !== 'undefined') {
  window.runMigration = runMigration;
  console.log('💡 Migration script loaded! Run: runMigration()');
} else {
  // Run directly if executed as a script
  runMigration();
}